Please note that you may encounter null values in the img_Url column (discussion_post table) 
and attachment_url column (comment table) within the SQL database.

This can occur due to the following reasons:

- Not all users choose to include an image when posting online discussions, 
resulting in a null value in the img_Url column of the discussion_post table.


- Similarly, not all users who comment on discussion posts attach a resource, 
leading to a null value in the attachment_url column of the comment table.