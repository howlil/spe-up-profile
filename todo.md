1. about us page [done]
2. event page 
3. membership page
4. alumni page
5. article page?

6. article admin
7. partnership data admin
8. alumne data admin
9. login

## pastikan semua ssg 

server :
1.setup server 
2.setup database harus agnostic
3.gunakna prisma
4.gunakan zod
5.api article 
    spek
    GET
    api/v1/articles
    {
        success : true
        message : "all data"
        data : [
            {
                cover : "link" #must be 1:1
                title : "title"
                describtion : "describ"
                datePost : # must be DD-MM-YYYY
                createdBy : "howlil"
                
            }
        ] 
    }
    GET
    api/v1/articles/:id
    {
        success : true
        message : "data :id"
        data : 
            {
                openingCover: "link" #must be 9:16
                title : "title"
                datePost : # must be DD-MM-YYYY
                createdBy : "howlil"
                content  : "content" 
                
            }
        
    }
    POST
     api/v1/article
     input 
           data : 
            {
                cover : "link" #must be 1:1
                openingCover: "link" #must be 9:16
                title : "title"
                datePost : # must be DD-MM-YYYY
                createdBy : # ambil dari midlleware
                content  : "content" 
                
            }
    {
        success : true
        message : "data :id"
        data : 
            {
                cover : "link" #must be 1:1
                openingCover: "link" #must be 9:16
                title : "title"
                datePost : # must be DD-MM-YYYY
                createdBy : "howlil"
                content  : "content" 
                
            }
        
    }

    PATCH
     api/v1/article/:id
     input 
           data : 
            {
                cover : "link" #must be 1:1
                openingCover: "link" #must be 9:16
                title : "title"
                datePost : # must be DD-MM-YYYY
                createdBy : # ambil dari midlleware
                content  : "content" 
                
            }
    {
        success : true
        message : "data :id"
        data : 
            {
                cover : "link" #must be 1:1
                openingCover: "link" #must be 9:16
                title : "title"
                datePost : # must be DD-MM-YYYY
                createdBy : "howlil"
                content  : "content" 
                
            }
        
    }
    DELETE 
    api/v1/article/:id
    {
        success : true
        message : "data :id"
        
    }

6. api partnertship 
   GET 
   api/v1/partnerships
   {
        success : true
        message : "data :id"
        data : {
            name
            institution
            email
            subject
            message
            file
        }
     
   }
   POST 
   api/v1/partnership
   data : {
            name
            institution
            email
            subject
            message
            file #optional
        }
   {
        success : true
        message : "data "
        data : {
            name
            institution
            email
            subject
            message
            file #optional
        }
     
   }
   PATCH
   api/v1/partnership/:id
   data : {
            name
            institution
            email
            subject
            message
            file #optional
        }
   {
        success : true
        message : "data "
        data : {
            name
            institution
            email
            subject
            message
            file #optional
        }
     
   }
   DELETE 
   api/v1/partnership/:id
   {
        success : true
        message : "data "
     
   }
   POST 
   api/v1/partnership/export/:id

7. api ALumni 
   GET 
   api/v1/alumnaes
   {
        success : true
        message : "data :id"
        data : {
            name
            institution
            email
            position
            message
            file
        }
     
   }
   POST 
   api/v1/alumnae
   data : {
            name
            institution
            email
            position
            message
            file #max 5mb mandatory
        }
   {
        success : true
        message : "data "
        data : {
            name
            institution
            email
            position
            message
            file
        }
     
   }
   PATCH
   api/v1/alumane/:id
   data : {
            name
            institution
            email
            position
            message
            file
        }
   {
        success : true
        message : "data "
        data : {
            name
            institution
            email
            position
            message
            file
        }
     
   }
   DELETE 
   api/v1/alumnae/:id
   {
        success : true
        message : "data "
     
   }
   POST 
   api/v1/alumnae/export/:id

8. api login
   POST
   /api/v1/login
   data{
    email
    password
   }

    {
        success : true
        message : "data "
        data :{
            token
            nama
            email
        }
     
   }