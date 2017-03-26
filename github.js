var GitHubApi = require("github");
 
var github = new GitHubApi({
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub 
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent 
    },
    Promise: require('bluebird'),
    followRedirects: true, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects 
    timeout: 5000
});
 
// TODO: optional authentication here depending on desired endpoints. See below in README. 
 
github.users.getFollowingForUser({
    // optional 
    headers: { 
         "cookie": "_octo=GH1.1.1899753974.1490142970; logged_in=yes; dotcom_user=zhangolve; _gh_sess=eyJzZXNzaW9uX2lkIjoiMDZhM2NiY2NjNzZjOTk3NjM3YTc4ZGExMzE3OGI2YzUiLCJjb250ZXh0IjoiLyIsInNweV9yZXBvIjoiY2FvbGFuL2FzeW5jIiwic3B5X3JlcG9fYXQiOjE0OTA0NTY3OTAsIl9mbGlwcGVyX2lkIjoyNDk1MjQ3NTE4NDYwNTMxMDk2NzcxNjQzMTczMDQsImxhc3Rfd3JpdGUiOjE0OTA0Mjk4NDkwNzd9--f5710ea5636972715f42a5d581ea40875f2fcebb; _gat=1; user_session=k01lARcXvF7VMHTf6n4RhhtFQW1VYyTsRgHcu87BD_gQIGpa; __Host-user_session_same_site=k01lARcXvF7VMHTf6n4RhhtFQW1VYyTsRgHcu87BD_gQIGpa; _ga=GA1.2.1083538775.1490142971; tz=Asia%2FShanghai" 
    }, 
    username: "defunkt"
}, function(err, res) {
    console.log(JSON.stringify(res));
});