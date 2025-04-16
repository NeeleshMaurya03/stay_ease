import User from '../models/user.model';  // Ensure this path is correct
import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses
) => {
  try {
    await connect();
    
    // Ensure email_addresses is an array and we get the correct email
    const email = email_addresses && email_addresses[0] ? email_addresses[0].email_address : '';

    // Log the data for debugging
    console.log('Creating or updating user:', { id, first_name, last_name, image_url, email });

    // Find and update or create the user
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          clerkId: id,  // Ensure the clerkId is set for matching
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email,  // Save the first email address
        },
      },
      { upsert: true, new: true } // `upsert` creates the user if not found
    );

    console.log('User after create/update:', user);  // Log the user data after creation/update
    return user;

  } catch (error) {
    console.error('Error: Could not create or update user:', error);
    throw new Error('Error: Could not create or update user');
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    
    // Log before deleting
    console.log('Deleting user with ID:', id);

    const deletedUser = await User.findOneAndDelete({ clerkId: id });

    if (!deletedUser) {
      console.log('No user found to delete with ID:', id);
      return null;
    }

    console.log('User deleted:', deletedUser);
    return deletedUser;
    
  } catch (error) {
    console.error('Error: Could not delete user:', error);
    throw new Error('Error: Could not delete user');
  }
};
