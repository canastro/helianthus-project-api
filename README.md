# About
    Creating a website for a photography

# Inspiration

    - Photography
        - http://www.danielkennedy.com/
        - http://east.co/
        - http://www.jillgreenberg.com/home#collages-index
    - Parallax
        - http://melanie-f.com/en/
        - http://urban-walks.com/#about
        - http://restaurantleduc.com/
        - http://www.loisjeans.com/es/ss2015/campaign
    - Others
        - http://tympanus.net/codrops/category/blueprints/
        - Pre-loader: http://tympanus.net/Tutorials/SVGLoaderGSAP/index6.html
        - Off-canvas menu: http://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/
        - http://tympanus.net/Development/HoverEffectIdeas/
        - http://tympanus.net/Tutorials/SamsungGrid/
        - http://tympanus.net/Development/ScatteredPolaroidsGallery/
        - http://tympanus.net/Development/CreativeLoadingEffects/

# Features

    - Photo tagging / commenting
        http://www.bennadel.com/blog/1837-creating-flickr-style-photo-tagging-with-jquery.htm

    - Each photo is associated to a category and multiple tags, both can be created in the backend

    - Show by category; tag; combination of tags/category;

    - Each photo has a title and can have a description, and shooting details (??)

    - Possibility of creating albums and histories

    - Share button in social media

    - Discus comments https://disqus.com/

    - Parallax effect??



# Techonology

    - Angular 2.0
    - Typescript
    - NodeJS
    - ExpressJS
    - MongoDB

# Tutorials
    - http://www.sitepoint.com/getting-started-with-angular-2-using-typescript/
    - https://github.com/sitepoint-editors/PinYourAchievements-Angular2-TypeScript
    - https://github.com/rkirov/youtube-app
    - http://www.sitepoint.com/introduction-futuristic-new-router-angularjs/

# Run

    gulp

# To do

    - Gallery
        - FE: Paginate

    - Photo:
        - BE: Update model
            - short description
            - photography setup
            - history (long description)
            - number of likes (?)
            - album
        - BE: Update POST
        - FE: Update upload photo form
        - FE: Back button on photo/:id
        - FE: Inline-comments (load, save, show)
        - FE: Share on facebook

    - Inline-Comments:
        - BE: Create model
        - BE: Create route to POST, DELETE

    - Photography-Setups:
        - BE: Create model
        - BE: Create route to POST, GET, DELETE

    - Album
        - BE: Create model
            - name
            - description
        - BE: Create Routes to POST, GET, DELETE, PUT
