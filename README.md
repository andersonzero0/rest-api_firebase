 API REST |  Firebase | Express

# POST : /post
    !request
    body:
        {
            "author": "< name >",
            "message": "< messge >"
        }
    
    !response
        success: "Successful post!"
        failure: "Post failed!'

# GET : /post
    !response
        [
            {
                "author":"Anderson Viana",
                "date":"13/07/2023",
                "message":"Hello, Firebase!"
            },
            {
                "author":"Jesus Cristo",
                "date":"13/07/2023",
                "message":"Hello, World!"
            }
        ]