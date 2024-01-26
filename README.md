# Laravel + iOS Starter Project
This repo contains a fully functional iOS app + a Laravel Backend API server that you can use as a starting point for building a professional grade iOS app.

If you find this repository helpful, please [☕️ Buy Me A Coffee](https://www.buymeacoffee.com/joryc).

## Features 
Out of the box, the app is capable of:
- 💁‍♀️ User account creation and authentication
- 🤑 In-app purchases with a monthly and yearly subscription option (requires [RevenueCat](https://www.revenuecat.com/) setup)
- 📜 Create and manage database records using the iOS app
- 🗝️ Forgot password / reset password flows
- 🕵️ Server monitoring (slow requests, cpu, memory, disk space, etc.) 
- 🧳 And more: graceful error handling, optimistic frontend state management, confirmation alerts, etc. 

## Frameworks
- iOS App - [Ionic](https://ionicframework.com/docs/) ([Angular](https://angular.io/)), [Capacitor](https://capacitorjs.com/docs/)
- Backend API - [Laravel](https://laravel.com/)

## Hardware Requirements
- 💻 Any iOS development requires a mac, so you need a mac.
- 📱 Ideally, a dedicated iOS device for developing + testing. You _can_ get by with the simulator if needed.

## Software Requirements
- ⛴️ Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) to run the Laravel API locally
- Add software required for the Ionic Framework. Instructions [here](https://ionicframework.com/docs/intro/environment) and [here](https://ionicframework.com/docs/intro/cli).
- Install "Core Requirements" and "iOS Requirements" for the Capacitor Framework. Instructions [here](https://capacitorjs.com/docs/getting-started/environment-setup)

## Setup
If you have the hardware and software requirements covered, let us get this app running. 

To start, create your own repository from this template. Clone your new repository to your computer.  

### Running the API
We will get the API server running on your computer for development. 

1. From the root of the repository, go to the laravel app directory:
    ```shell
    cd api
    ```
2. Install dependencies
    ```shell
   docker run --rm \
     -u "$(id -u):$(id -g)" \
     -v "$(pwd):/var/www/html" \
     -w /var/www/html \
     laravelsail/php82-composer:latest \
     composer install --ignore-platform-reqs
   ```
3. Start the docker container
    ```shell
    ./vendor/bin/sail up
   ```
4. Initialize laravel application
    ```shell
    cp .env.example .env
   ```
    ```shell
   ./vendor/bin/sail artisan key:generate
    ```
5. Run DB migrations
    ```shell
    ./vendor/bin/sail artisan migrate
   ```
   
We're using [Laravel Sail](https://laravel.com/docs/10.x/sail) here. Get comfortable with it as you will need it to run and debug your Laravel application. 

### Running the iOS App
We will get the iOS app running on your computer for development

1. From the root of the repository:
    ```shell
   cd client
    ```
2. Run the iOS App in XCode simulator
    ```shell
   npm run start:ios
    ```
Follow the prompts. The app should open in the Simulator. This starts a hot-reload environment enabling quick edit-test cycles for development.

You should be able to use the app to create an account and manage "Articles". 

The iOS App is communicating with the Laravel API and making records in the MySQL database!
    
## Start Building Your App
With your app running, you can now start building your app. 

The app is currently a generic app to manage "Articles". As you build, you will probably delete the "Article" model and replace it with your own models. 

The project has 2 main pieces:
- /api
  - This is where the Laravel app lives. 
  - It's a standard Laravel 10.x app. 
  - I have implemented User authentication as well as files needed for managing an "Article" model.
  - [Laravel Documentation](https://laravel.com/docs/10.x)
    
- /client 
  - This is where the iOS app lives. 
  - It's a standard Ionic app using Angular as the Javascript framework.
  - I have implemented the forms and api requests needed for User authentication as well as the UI for managing an "Article" model.  
  - [Ionic Documentation](https://ionicframework.com/docs)

## Integrations
This section is only relevant if you intend to publish an actual app to the App Store. If you're just playing around, you don't need them!

You can also skip this section and come back to this later.

### RevenueCat
In-app purchases are implemented with the help of [RevenueCat](https://www.revenuecat.com/).

This project is set up to facilitate a simple in-app subscription which unlocks the "Premium" features of your app. There are two subscription options: monthly or yearly.

If you app needs something more custom, it's completely doable, but it's up to you to figure out. 

To set up: 
1. Create an account in RevenueCat. 
2. Create a RevenueCat project and set up your Products and Entitlement.
3. Go to [/client/src/revenue-cat.ts](./client/src/revenue-cat.ts) and enter your "Public app-specific API key", as well as your Products and Entitlement identifiers (I've put in defaults for you).

## Deployment
Every production app needs to be deployed. For this project to go live you must: 
1. Deploy the API server, and 
2. Publish the iOS app to the App Store.

### Deploying the API
Being that you have a standard Laravel app, it should be straightforward to deploy. For my apps, I used Laravel Forge paired with Digital Ocean. 

### Deploying the iOS App
 
1. From the root of the repository:
    ```shell
   cd client
    ```
2. Generate a production build:
    ```shell
   npm run build:ios:prod
    ```
XCode will open and you can deploy the app as you would any other iOS app. I won't get into the details in the scope of this document.

## Side-quests
In order for the app to be production ready, you may want to figure out a few more things before deploying. I've outlined the ones I can think of:

### Email
You need the ability to send email to your users for password reset links. For my apps, I've used [Mailersend](https://www.mailersend.com/) which integrates seamlessly with Laravel.

[Instructions for Laravel + Mailersend.](https://laravel.com/docs/10.x/mail#mailersend-driver)

### Log Monitoring
You should set up some sort of log monitoring tf you want to be alerted about unexpected errors, or other things happening in your app.

In my apps, I have set up the Slack driver for Laravel logs. The result is that any log my app produces gets sent as a slack message. 

[Instructions for setting up the Slack driver for Laravel logs.](https://laravel.com/docs/10.x/logging#configuring-the-slack-channel)

### Frontend Monitoring
I've set up Sentry to report on unexpected errors happening on the iOS devices. 

[Instructions for Sentry + Capacitor.](https://docs.sentry.io/platforms/javascript/guides/capacitor/)




