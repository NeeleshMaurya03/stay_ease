import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { clerkClient } from '@clerk/nextjs'
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user'; // adjust path as needed

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);
    console.log('Webhook event:', evt); // Log the whole event for debugging

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { first_name, last_name, image_url, email_addresses } = evt.data;

      try {
        const user = await createOrUpdateUser(
          id,
          first_name,
          last_name,
          image_url,
          email_addresses
        );

        console.log('User created/updated:', user); // Log user creation or update

        // Set public metadata if it's a new user
        if (user && eventType === 'user.created') {
          try {
            await clerkClient.users.updateUserMetadata(id, {
              publicMetadata: {
                userMogoId: user._id,
              },
            });
            console.log('User metadata updated:', user._id);
          } catch (error) {
            console.error('Error: Could not update user metadata:', error);
          }
        }
      } catch (error) {
        console.error('Error: Could not create or update user:', error);
        return new Response('Error: Could not create or update user', { status: 400 });
      }
    }

    if (eventType === 'user.deleted') {
      try {
        await deleteUser(id);
        console.log('User deleted:', id);
      } catch (error) {
        console.error('Error: Could not delete user:', error);
        return new Response('Error: Could not delete user', { status: 400 });
      }
    }

    return new Response('Webhook received', { status: 200 });

  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
