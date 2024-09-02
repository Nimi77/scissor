# Linktrim

**Linktrim** is a URL shortening tool designed to provide users with the ability to create custom short URLs, generate QR codes, and track basic analytics.

- [Linktrim](#linktrim)
  - [Features](#features)
  - [Tool Highlights](#tool-highlights)
  - [Technologies Used](#technologies-used)
  - [Usage](#usage)
  - [Installation](#installation)
  - [Contributing](#contributing)
  - [License](#license)
  - [Access Link](#access-link)

## Features

**Custom URLs**

Create personalized short URLs to represent your brand or message. Scissor allows users to choose custom slugs to make their links memorable.

**QR Code Generation**

Automatically generate a QR code for each shortened URL. Users can download the QR code image directly from the platform for use in marketing materials.

**Analytics**

Track the performance of your URLs by monitoring click data. This feature helps you understand your audience better and optimize your campaigns.

## Tool Highlights

**URL Shortening**

- **Navigate to the Landing Page:**  
  Go to the landing page of the Scissor application.

- **Enter a URL:**  
  Input the URL you wish to shorten.

- **Generate Short URL:**  
  Click the "Shorten" button to create your shortened URL.

**Managing URLs**

- **Sign In:**  
  Log in to access your dashboard.

- **View Analytics:**  
  Check the analytics for each shortened URL.

- **Customize the URL (Optional):**  
  Personalize your URL by choosing your domain name or path.

- **Edit/Delete URLs:**  
  Modify or remove your custom URLs as needed.

**QR Codes**

- **Download QR Codes:**  
  After shortening a URL, download the corresponding QR code image.

- **Use in Marketing:**  
  Incorporate the QR code into your digital or print marketing materials.

## Technologies Used

**Frameworks**

- **Next.js** - Server-side rendered frontend.

**Libraries**

- **NextAuth.js** - Authentication and authorization.
- **Chakra UI** - Component library.

**Styling**

- **Tailwind CSS** - Additional styling and design.
- **Vanilla CSS**

**Database**

- **PostgresSQL** - Database management.

## Usage

To use Linktrim, follow these steps:

1. **Navigate to the Landing Page:** Visit [linktrim.vercel.app](https://linktrim.vercel.app) to access the main page.
2. **Sign In:** If you want to manage your URLs and view analytics, sign in to your account.
3. **Shorten a URL:** Enter the long URL you wish to shorten and click the "Shorten" button.
4. **Copy and Use the Short URL:** Use the generated short URL for your campaigns.
5. **Download QR Code:** Optionally, download the QR code for the shortened URL.
6. **View Analytics:** Sign in to your dashboard to track clicks and other metrics.

## Installation

To set up this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Nimi77/scissor.git
   ```

2. Navigate to the project directory:

   ```bash
   cd scissor
   ```

3. Install dependencies:

   ```bash
   npm install
   bun install
   ```

4. Set up environment variables by creating a `.env` file.
5. Run the development server
   ```bash
   npm run dev or bun run dev
   ```
6. Open your browser and visit `http://localhost:3000`

## Contributing

To contribute:

1. Fork the repository.
2. Clone your fork.
3. Create a new branch: `git checkout -b my-feature-branch`
4. Make your changes
5. Push to your branch: `git push origin feature-name`
6. Submit a pull request.

## License

Linktrim is licensed under the MIT License. You are free to use, modify, and distribute this software under the terms of the license.

## Access Link

You can access the live version of Linktrim at [linktrim](linktrim.vercel.app)