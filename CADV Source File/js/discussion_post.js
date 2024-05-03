var username=sessionStorage.getItem('username')
function getAllUsers(callback) {
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://504phapdij.execute-api.us-east-1.amazonaws.com/user-information",
      true
    );
    request.onload = function () {
      var users = JSON.parse(request.responseText);
      console.log("users", users);
      callback(users);
    };
    request.send();
  }
  
  function getAllDiscussionPosts() {
    var accessToken=sessionStorage.getItem('accessToken');
    getAllUsers(function (users) {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/discussion-posts",
        true
      );
      request.setRequestHeader(
        "Authorization",accessToken
      )
  
      request.onload = function () {
        var posts = JSON.parse(request.responseText);
        console.log(posts);
        displayDiscussionPosts(posts, users);
      };
  
      request.send();
    });
  }
  const postCommentStates = {};
  function displayDiscussionPosts(posts, users) {
    var username=sessionStorage.getItem('username')
    var container = document.getElementById("discussionContainer");
    posts.forEach(function (post) {
      var user = users.find(function (user) {
        return user.username === post.username;
      });
      postCommentStates[post.post_id] = false;
      var postContainer = document.createElement("div");
      postContainer.classList.add("discussion-post-container");
      var commentsContainerId = "commentsContainer-" + post.post_id;
      var postContent =
      '<div class="discussion-post">' +
      '<div class="profile-post-container" style="display:flex;">'+
      '<img class="profile-picture" src="' + (user ? user.ProfileImgUrl : 'default_profile_picture_url_here') + '" alt="Profile Picture">' +
      '<div class="post-content">' +
          '<div style="display:flex">' +
              '<p class="post-username">' + post.username + '</p>' +
              (post.username === username ? 
              '<div class=custom-dropdown-1>' +
                  '<i class="fas fa-ellipsis-h three-dots-icon" style="margin-top:5px;margin-left:300px;cursor:pointer;" onclick="showDropdownMenu(' + post.post_id + ')"></i>' +
                  '<div class="dropdown-menu-post" id="dropdown-menu-post-' + post.post_id + '" style="display: none;z-index:6;">' +
                      '<div class="dropdown-option" onclick="editPost(' + post.post_id + ')">' +
                          '<i class="fas fa-pen"></i>' +
                          'Edit' +
                      '</div>' +
                      
                      '<div class="dropdown-option" onclick="deletePost(' + post.post_id + ')">' +
                          '<i class="fas fa-trash"></i>' +
                          'Delete' +
                      '</div>' +
                  '</div>' +
              '</div>' : '') +
          '</div>' +
          '<p class="post-date">' + new Date(post.created_at).toLocaleString().split(",")[0] + '</p>' +
          '<div class="post-header">' +
              '<h2 class="post-title">' + post.title + '</h2>' +
          '</div>' +
          '<p class="post-content-text">' + post.content + '</p>' +
          (post.img_url ? '<img class="post-image" src="' + post.img_url + '" alt="Discussion Post Image">' : '') +
          '<div style="display:flex;">'+
          '<p style="margin-right:10px">Comment</p>'+
          '<i class="fas fa-comments comment-icon" onclick="toggleComments(' + post.post_id + ', \'' + commentsContainerId + '\')"></i>' +
          '</div>'+
          '<div id="' + commentsContainerId + '" style="margin-top:20px;" ></div>' +
      '</div>' +
      '</div>'+
      '<div class="add-comment" style="display:flex;margin-top:30px;margin-bottom:20px;margin-left:0;margin-left:0;">'+
      '<img class="profile-picture" src="https://image-upload-for-profile-pic.s3.amazonaws.com/' + username + '" style="padding:0;margin-top:5px">'+
      '<textarea id="commentInput" style="padding:15px;margin-left:40px;margin-top:5px;border-radius:40px;border:none;height:1.5em;" placeholder="Add a comment" ></textarea>'+
      '<button class="ask-question-btn" style="margin-left:50px;margin-top:12px;margin-bottom:30px;" onclick="addComments('+post.post_id+')">Comment</button>'+
    '</div>';
    
       
  '</div>';
  
  
      postContainer.innerHTML = postContent;
      container.appendChild(postContainer);
    });
  }
  function toggleComments(post_id, commentsContainerId) {
    const commentsContainer = document.getElementById(commentsContainerId);
    if (!commentsContainer) {
      console.error("commentsContainer element not found!");
      return;
    }
    const currentState = postCommentStates[post_id];
    if (currentState) {
      commentsContainer.style.display = "none";
    } else {
      getComments(post_id, commentsContainerId);
      commentsContainer.style.display = "block";
    }
    postCommentStates[post_id] = !currentState;
  }
  
 function searchDiscussionPosts(){
  var accessToken=sessionStorage.getItem('accessToken')
    getAllUsers(function(users){
        var keyword=document.getElementById('searchInput').value
        console.log(keyword)
        var response=""
        var request= new XMLHttpRequest();
        request.open("GET",
        "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/discussion-posts/search?keyword="+keyword,
        true
        ),
        request.setRequestHeader(
            "Authorization",accessToken
            
          );
      
        request.onload= function(){
            response=JSON.parse(request.responseText)
            console.log('search',response);
            var container = document.getElementById("discussionContainer");
            container.innerHTML = '';
            displayDiscussionPosts(response, users);
    
        },
        request.send();
    })
    
 }

 function liveSearchDiscussionPosts() {
    var keyword = document.getElementById("searchInput").value;
    if (keyword === "") {
        getAllDiscussionPosts();
    } else {
        searchDiscussionPosts();
    }
}

function openAskQuestionModal() {
   var accessToken= sessionStorage.getItem('accessToken')
   if(accessToken!=null){
    document.getElementById("createPostModal").style.display = "block";}
    else{
      alert('Please Login or Sign Up first')
    }
  }
  

  function closeModal() {
    document.getElementById("createPostModal").style.display = "none";
  }
  document.addEventListener("DOMContentLoaded",function(){
    var username=sessionStorage.getItem('username');
    document.getElementById('uploadPost-username').textContent=username
    document.getElementById('discussionPostProfile').src="https://image-upload-for-profile-pic.s3.amazonaws.com/"+username
    var u= sessionStorage.getItem('users')
    document.getElementById("imagePostInput").addEventListener("change", function() {
        var fileName = this.files[0].name;
        document.getElementById("selectedFileName").innerText = "Selected File: " + fileName;
      });
    
    
  })
  
  async function addDiscussionPosts() {
  var username=sessionStorage.getItem('username')
  var accessToken=sessionStorage.getItem('accessToken')
    closeModal();
    var response = "";
    var request = new XMLHttpRequest();
    var jsonData = new Object();
    jsonData.username = username;
    jsonData.title = document.getElementById("postTitle").value;
    jsonData.content = document.getElementById("postDescription").value;
    request.open(
      "POST",
      "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/add-posts",
      true
    );
    request.setRequestHeader(
        "Authorization",accessToken
      );
    request.onload = async function () {
      response = JSON.parse(request.responseText);
      var post_id = response["lastInsertedPostId"];
      const discussionPostImgInput = document.getElementById("imagePostInput");
      const file = discussionPostImgInput.files[0]; 
  
      try {
        const uploadResponse = await axios.post(
          "https://dzgrg1cu16.execute-api.us-east-1.amazonaws.com/discussion-posts/"+username,
          { post_id: post_id, 
            discussionPostImg: file }
        );
  
        console.log(uploadResponse.data);
        const signedUrl = uploadResponse.data.url;
        const s3Response = await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        location.reload();
      } catch (error) {
        console.error(error);
      }
      
    };
    request.send(JSON.stringify(jsonData));
  }
  function showDropdownMenu(post_id) {
    var dropdownMenu = document.getElementById('dropdown-menu-post-' + post_id);
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  }
function closeDropdownMenu(post_id){
    var dropdownMenu=document.getElementById('dropdown-menu-post-'+post_id);
    dropdownMenu.style.display="none";
}
function deletePost(post_id){

  var accessToken=sessionStorage.getItem('accessToken')
    var response=""
    var request= new XMLHttpRequest();
    request.open("DELETE",
    "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/posts/"+post_id,
    true
    )
    request.setRequestHeader(
        "Authorization",accessToken
      );
    request.onload=function(){
        response=JSON.parse(request.responseText);
        console.log((response))
        if(response.affectedRows==1){
            location.reload()
            alert("Post is deleted succesfully")
        }
        else{
            alert('Error. Unable to delete the Post')
        }

    };
    request.send();
    }
function editPost(post_id){
    closeDropdownMenu(post_id)

    var accessToken=sessionStorage.getItem('accessToken')
    document.getElementById('editPostModal').style.display="block";
    var response=""
    var request= new XMLHttpRequest();
    request.open("GET",
    "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/discussion-post/"+post_id,
    true
    )
    request.onload=function(){
        response=JSON.parse(request.responseText);
        var username=response[0].username;
        document.getElementById('editPost-username').textContent=username;
        document.getElementById('discussionEditPostProfile').src="https://image-upload-for-profile-pic.s3.amazonaws.com/"+username
        document.getElementById('editPostTitle').value=response[0].title
        document.getElementById('editPostDescription').value=response[0].content
        document.getElementById("imageEditPostInput").addEventListener("change", function() {
            var fileName = this.files[0].name;
            document.getElementById("selectedFileNameEdit").innerText = "Selected File: " + fileName;
          });
        document.querySelector(".update-btn").addEventListener("click",function(){updateDiscussionPost(post_id,username)})
    }
    request.send();

}
function updateDiscussionPost(post_id,username){
    
   var accessToken=sessionStorage.getItem('accessToken')
    var response=""
    var request= new XMLHttpRequest();
    var jsonData= new Object();
    jsonData.title=document.getElementById('editPostTitle').value;
    jsonData.content=document.getElementById('editPostDescription').value;
    if (document.getElementById('imageEditPostInput').files[0] != null) {
    jsonData.img_url="https://discussionposts.s3.amazonaws.com/"+username+"-"+post_id}
    request.open("PUT",
    "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/posts/"+post_id,
    true
    )
    request.setRequestHeader(
        "Authorization",accessToken
      );
    request.onload= async function () {
        response = JSON.parse(request.responseText);
        
        console.log(response)
        const discussionEditPostImgInput = document.getElementById("imageEditPostInput");
        const file = discussionEditPostImgInput.files[0]; 
        if (file != null) {
        try {
          const uploadResponse = await axios.post(
            "https://dzgrg1cu16.execute-api.us-east-1.amazonaws.com/discussion-posts/"+username,
            { post_id: post_id, 
              discussionEditPostImg: file }
          );
    
          console.log(uploadResponse.data);
          const signedUrl = uploadResponse.data.url;
          const s3Response = await axios.put(signedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
          location.reload();
        } catch (error) {
          console.error(error);
        }}
        if(response.affectedRows=="1"){
            alert("Post is updated successfully")
            location.reload()
        }
      };
      request.send(JSON.stringify(jsonData));
      closeEditModal()
}
function closeEditModal(){
    document.getElementById('editPostModal').style.display="none";
}

function getComments(post_id,commentsContainerId) {

   var accessToken=sessionStorage.getItem('accessToken')
    var response = "";
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/discussion-posts/comments/" +
        post_id,
      true
    );
    request.setRequestHeader(
      "Authorization",
      accessToken
    );
    request.onload = function () {
      response = JSON.parse(request.responseText);
      console.log(response);
      if(response.length==0){
        alert('No comments for this post')
      }else{
      displayComments(response, commentsContainerId);}
    };
    request.send();
  }
  
  function displayComments(comments, commentsContainerId) {
    var username = sessionStorage.getItem('username')
    var commentsContainer = document.getElementById(commentsContainerId);
    if (!commentsContainer) {
      console.error("commentsContainer element not found!");
      return;
    }
  
    commentsContainer.innerHTML = "";
  
    comments.forEach(function (comment) {
      var commentContainer = document.createElement("div");
      commentContainer.classList.add("comment-container");
  
      var commentContent =
        '<div class="comment" style="margin-top:30px;" >' +
        '<div style="display:flex;">' +
        '<img class="profile-picture" src="https://image-upload-for-profile-pic.s3.amazonaws.com/' + comment.username + '" style="margin-top:10pxmargin-right:10px;">' +
        '<div class="comment-content" style="background-color: rgba(0, 0, 0, 0.4);padding-left:30px;padding-right:20px;padding-bottom:10px;border-radius:20px;">' +
        '<p class="comment-username">' +
        comment.username +
        "</p>" +
        '<p class="comment-text" style="font-weight:100;font-size:15px;color:#fff;">' +
        comment.content +
        "</p>" +
        "</div>";
  
      // Add the three-dot icon if username matches comment.username
      if (username === comment.username) {
        commentContent +=
          '<i class="fas fa-ellipsis-v three-dots-icon-1" style="margin-top:30px;margin-left:40px;cursor:pointer;" onclick="showCommentDropdownMenu(' + comment.comment_id + ')"></i>' +
          '<div class="dropdown-menu-comment" id="dropdown-menu-comment-' + comment.comment_id + '" style="display: none;z-index:6;margin-left:10px;margin-top:20px;">' +
          '<div class="dropdown-option" onclick="editComment(' + comment.comment_id + ')" style="padding:10px;">' +
          '<i class="fas fa-pen"></i>' +
          'Edit' +
          '</div>' +
          '<div class="dropdown-option" onclick="deleteComment(' + comment.comment_id + ')" style="padding:10px;">' +
          '<i class="fas fa-trash"></i>' +
          'Delete' +
          '</div>' +
          '</div>';
      }
  
      commentContent += '</div></div>';
  
      commentContainer.innerHTML = commentContent;
      commentsContainer.appendChild(commentContainer);
    });
  }
  
function addComments(post_id){

   var accessToken=sessionStorage.getItem('accessToken')
    var username=sessionStorage.getItem('username')
    
    var response=""
    var jsonData=new Object();
    jsonData.post_id=post_id;
    jsonData.username=username
    jsonData.content=document.getElementById('commentInput').value;
    console.log('Comment Content:', jsonData.content);
    var request=new XMLHttpRequest();
    request.open("POST",
    "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/comments",
    true)
    request.setRequestHeader(
        "Authorization",accessToken
      );
    request.onload=function(){
        response=JSON.parse(request.responseText);
        
        console.log('addComment',response)
        if(response.affectedRows==1){
            alert("Comment is added successfully")
            location.reload()
        }
        else{
            alert("Error. Comment cannot be added")
        }
    }
    request.send(JSON.stringify(jsonData))

}
function showCommentDropdownMenu(comment_id) {
    var dropdownMenu = document.getElementById('dropdown-menu-comment-' + comment_id);
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  }
function deleteComment(comment_id){

  var accessToken=sessionStorage.getItem('accessToken')
    var response=""
    var request=new XMLHttpRequest()
    request.open("DELETE",
    "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/comments/"+comment_id,
    true
    )
    request.setRequestHeader(
        "Authorization",accessToken
      );
    request.onload=function(){
        response=JSON.parse(request.responseText);
        if(response.affectedRows==1){
            alert("comment is successfully deleted");
            location.reload()
        }
        else{
            alert("Error. Comment cannot be deleted")
        }
    }
    request.send();
}
function editComment(comment_id){
    document.getElementById('editCommentModal').style.display="block";
    document.getElementById('dropdown-menu-comment-' + comment_id).style.display="none";
    var response = "";
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/discussion-comments/"+comment_id,
      true
    );
    request.onload = function () {
      response = JSON.parse(request.responseText);
      var username=response[0].username
      console.log(response)
      document.getElementById('editComment-username').textContent=username;
      document.getElementById('discussionEditCommentProfile').src= "https://image-upload-for-profile-pic.s3.amazonaws.com/"+username;
      document.getElementById('editComment').value=response[0].content;
      document.getElementById('updateCommentBtn').addEventListener('click',function(){updateComment(comment_id)})
    };
    request.send();
}
function closeEditComment(){
    document.getElementById('editCommentModal').style.display="none";
    
}
function updateComment(comment_id){
   
   var accessToken=sessionStorage.getItem('accessToken')
    var response=""
    var jsonData= new Object();
    jsonData.content=document.getElementById('editComment').value;
    var request=new XMLHttpRequest();
    request.open("PUT",
    "https://4623wk6kol.execute-api.us-east-1.amazonaws.com/comments/"+comment_id,
    true),
    request.setRequestHeader(
        "Authorization",accessToken
      );
    request.onload=function(){
        response=JSON.parse(request.responseText);
        if(response.affectedRows==1){
            alert("Comment is updated successfully");
            location.reload()
        }
        else{
            alert("Error. Comment cannot be updated")
        }

    },
    request.send(JSON.stringify(jsonData))
}