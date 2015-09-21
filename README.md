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
        - Modals: http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/
        - Dashboard: https://github.com/IronSummitMedia/startbootstrap-sb-admin-2

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

    - Settings like http://tympanus.net/Development/ButtonComponentMorph/index7.html

    - Gallery
        - Use packery or isotope
        - FE: Paginate
        - Layout: the browsing of photos (group/filter by category/tag/name/setup)

    - Photo:
        - FE: Next/previous photo
        - FE: Add stats (views / likes / comments (?))
        - FE: Open to fullscreen;
        - FE: Update upload photo form
        - FE: Back button on photo/:id
        - FE: Share on facebook
        - BE/FE: On post new photo ask if wants to share to facebook, instagram, twitter, etc.
        - Click on category/tag and show a list of filtered photos
        - BE: Automatically add watermark to uploaded photos
        - BE: Load comments
        - BE: Automatically create thumbnails to uploaded photos

    - Inline-Comments:
        - BE: Create route to DELETE
        - FE: Limit text
        - FE: Add name / email to comments
        - FE: Create a inline form

    - Photography-Setups:
        - BE: Create route to POST, GET, DELETE

    - Album
        - BE: Create Routes to POST, GET, DELETE, PUT

    - Admin
        - FE: Create dashboard like interface
