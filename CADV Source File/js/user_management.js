function clearSession() {
  sessionStorage.removeItem("idToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  alert("LogOut Successfully");
  window.location.href = "https://d1xlpt1oc7so68.cloudfront.net/";
 
}

function getUserInformation() {
  var userForm = document.getElementById("user-form");
  userForm.addEventListener("submit", updateUserInformation);
  var response = "";
  var request = new XMLHttpRequest();
  var username=sessionStorage.getItem("username");
  var accessToken=sessionStorage.getItem("accessToken");
  request.open(
    "GET",
    "https://504phapdij.execute-api.us-east-1.amazonaws.com/user-information/"+username,
    true
  );
  request.setRequestHeader(
    "Authorization",accessToken 
  );
  request.onload = function () {
    response = JSON.parse(request.responseText);
    document.getElementById("profile-pic").src = response.Items[0].ProfileImgUrl + "?t=" + Date.now();
    document.getElementById("username").textContent =
      response.Items[0].username;
    document.getElementById("first-name").value = response.Items[0].FirstName;
    document.getElementById("last-name").value = response.Items[0].LastName;
    document.getElementById("contact-no").value = response.Items[0].ContactNo;
    document.getElementById("email").value = response.Items[0].email;
    document.getElementById("occupation").value = response.Items[0].Occupation;
    console.log(response);
  };
  request.send();
}

function updateUserInformation(event) {
  event.preventDefault();
  var username=sessionStorage.getItem("username");
  var accessToken=sessionStorage.getItem("accessToken");
  var response = "";
  var jsonData = new Object();
  jsonData.FirstName = document.getElementById("first-name").value;
  jsonData.LastName = document.getElementById("last-name").value;
  jsonData.ContactNo = document.getElementById("contact-no").value;
  jsonData.Occupation = document.getElementById("occupation").value;
  console.log(jsonData);
  if (
    jsonData.FirstName == "" ||
    jsonData.LastName == "" ||
    jsonData.ContactNo == "" ||
    jsonData.Occupation == ""
  ) {
    alert("All fields are required");
    return;
  }
  var request = new XMLHttpRequest();
  request.open(
    "PUT",
    "https://504phapdij.execute-api.us-east-1.amazonaws.com/users/"+username,
    true
  );
  request.setRequestHeader(
    "Authorization",accessToken
    
  );

  request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == "user edited") {
      alert("Your information are updated successfully");
      location.reload();
    } else {
      alert("Error. Unable to update your application");
    }
  };
  request.send(JSON.stringify(jsonData));
}

function handleCallback() {
  const urlParams = new URLSearchParams(window.location.hash.substr(1)); // Remove the leading '#'
  const idToken = urlParams.get("id_token");
  const accessToken = urlParams.get("access_token");
  const refreshToken = urlParams.get("refresh_token");

  sessionStorage.setItem("idToken", idToken);
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);
  var base64Url = idToken.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  var payload = JSON.parse(jsonPayload);
  var username = payload["cognito:username"];
  sessionStorage.setItem("username", username);
  console.log("Username:", username);

  window.location.hash = "";
}

function useTokens() {
  const idToken = sessionStorage.getItem("idToken");
  const accessToken = sessionStorage.getItem("accessToken");
  console.log("ID Token:", idToken);
  console.log("Access Token:", accessToken);
}

if (
  window.location.hash.includes("id_token") &&
  window.location.hash.includes("access_token")
) {
  handleCallback();
} else {
  useTokens();
}


if (sessionStorage.getItem("idToken") != null) {
  document.getElementById("logOut").style.display = "block";
  document.getElementById("navUser").innerHTML =
    '<a href="user.html"><span class="fa-sharp fa-solid fa-user"></span> Profile</a>';
} else {
  document.getElementById("logOut").style.display = "none";
}

function changeProfilePic() {
  console.log("clicked");
  var username=sessionStorage.getItem("username");
  document.getElementById("profile-modal").style.display = "block";
  const form = document.getElementById("imageForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const profilePicInput = document.getElementById("imageInput");
    const file = profilePicInput.files[0];

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        "https://0g1vqm3kd9.execute-api.us-east-1.amazonaws.com/change-pic/"+username,
        {
          profilePic: file,
        }
      );

      console.log(response.data);
      const signedUrl = response.data.url;
      const profilePicUrl = signedUrl.split("?")[0] + "?t=" + Date.now();
      console.log(profilePicUrl);
      updateProfilePicture(profilePicUrl);
      const s3Response = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
    } catch (error) {
      console.error(error);
     
    }
  });
  var closeModal = document.getElementById("closeModal");
  closeModal.addEventListener("click", function () {
    document.getElementById("profile-modal").style.display = "none";
  });
}


function updateProfilePicture(profilePicUrl) {
var username=sessionStorage.getItem("username");
  var jsonData = new Object();
  jsonData.ProfileImgUrl = profilePicUrl;
  var response = "";
  var request = new XMLHttpRequest();
  request.open(
    "PUT",
    "https://504phapdij.execute-api.us-east-1.amazonaws.com/profile-pic/"+username,
    true
  );
  request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == "profile picture updated") {
      alert("Your Profile Picture is updated successfully");
      location.reload();
    } else {
      alert("Error. Unable to update your profile picture");
    }
  };
  request.send(JSON.stringify(jsonData));
}
function deleteAccount(){
  var username=sessionStorage.getItem('username');
  var accessToken=sessionStorage.getItem('accessToken')
  var confirmation= confirm('Are you sure to delete your account?');
  if(confirmation){

  var response=""
  var request= new XMLHttpRequest();
  request.open("DELETE",
  "https://504phapdij.execute-api.us-east-1.amazonaws.com/users/"+username,
  true

  )
  request.setRequestHeader(
    "Authorization",accessToken
  )
  request.onload=function(){
    response=JSON.parse(request.responseText)
    if(response.message=="Success"){
      alert("Your account is deleted successfully")
      clearSession()
    }

  }
  request.send();



}
}