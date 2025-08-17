# Live Link - https://find-my-recipe-eight.vercel.app/

# 

A full-stack web application that generates delicious recipes from available ingredients using AI. Built with Next.js, React, and Google's Gemini Pro model. **Fully mobile-responsive and optimized for all devices!**

## ✨ Features

- **AI-Powered Recipe Generation**: Uses Google's advanced Gemini Pro model to create unique recipes
- **Mobile-First Design**: Fully responsive and optimized for smartphones, tablets, and desktop
- **Touch-Friendly Interface**: Large touch targets and smooth interactions for mobile devices
- **Progressive Web App**: Can be installed on mobile devices like a native app
- **Dark Mode Support**: Automatic dark mode detection for better mobile experience
- **Real-time Generation**: Get recipes instantly with loading states and error handling
- **Serverless Backend**: Ready for deployment on Vercel with no database required

## 📱 Mobile Features

- **Responsive Layout**: Adapts perfectly to all screen sizes (320px to 4K)
- **Touch Optimized**: 44px+ touch targets for easy interaction
- **No Zoom on Input**: Prevents iOS zoom when focusing on text inputs
- **Smooth Animations**: Optimized animations that work well on mobile
- **Fast Loading**: Optimized for mobile network conditions
- **PWA Ready**: Can be added to home screen on mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key (free at [makersuite.google.com](https://makersuite.google.com/app/apikey))

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd ai-recipe-generator
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   **Mobile Testing**: Use Chrome DevTools or visit from your phone on the same network

### How to Use

1. Enter your available ingredients in the textarea (separated by commas)
2. Click "Generate Recipe" or press Ctrl+Enter (desktop) / tap the button (mobile)
3. Wait for the AI to create a delicious recipe for you!
4. The recipe will include ingredients, instructions, cooking time, and tips

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Axios
- **Backend**: Next.js API Routes (serverless)
- **AI Model**: Google Gemini Pro
- **Styling**: CSS with modern gradients and animations
- **Mobile**: Responsive design with touch optimizations
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
ai-recipe-generator/
├── app/
│   ├── api/
│   │   └── generate-recipe/
│   │       └── route.js          # Serverless API endpoint
│   ├── globals.css               # Global styles (mobile-responsive)
│   ├── layout.js                 # Root layout (PWA meta tags)
│   └── page.js                   # Main React component
├── package.json                  # Dependencies and scripts
├── next.config.js               # Next.js configuration
├── vercel.json                  # Vercel deployment config
├── env.example                  # Environment variables template
└── README.md                    # This file
```

## 🚀 Deployment to Vercel

### Step-by-Step Deployment Guide

#### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your project:**
   ```bash
   vercel
   ```
   
   **Follow the prompts:**
   - Set up and deploy? → `Y`
   - Which scope? → Select your account
   - Link to existing project? → `N`
   - Project name? → `ai-recipe-generator` (or press Enter for default)
   - Directory? → `./` (press Enter for current directory)
   - Override settings? → `N`

4. **Set up environment variables:**
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Enter your Gemini API key when prompted.

5. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

#### Option 2: Deploy via GitHub (Alternative)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-recipe-generator.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Add environment variables in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key
   - Click "Save"
   - Redeploy the project

### Environment Variables Setup

#### In Vercel Dashboard:
1. Go to your project dashboard
2. Click "Settings" tab
3. Navigate to "Environment Variables"
4. Add new variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environment**: Production, Preview, Development (select all)
5. Click "Save"
6. Redeploy your project

#### Using Vercel CLI:
```bash
# Add environment variable
vercel env add GEMINI_API_KEY

# List environment variables
vercel env ls

# Remove environment variable (if needed)
vercel env rm GEMINI_API_KEY
```

### Post-Deployment Steps

1. **Test your deployment:**
   - Visit your Vercel URL
   - Test on both desktop and mobile
   - Try generating a recipe

2. **Set up custom domain (optional):**
   - Go to project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain
   - Update DNS settings as instructed

3. **Monitor your app:**
   - Check Vercel Analytics
   - Monitor API usage in Google AI Studio
   - Set up error tracking if needed

## 🔧 API Endpoint

The app includes a serverless API endpoint at `/api/generate-recipe`:

**POST** `/api/generate-recipe`

**Request Body:**
```json
{
  "ingredients": "chicken, rice, vegetables"
}
```

**Response:**
```json
{
  "recipe": "Generated recipe text..."
}
```

## 🎨 Customization

### Styling
- Modify `app/globals.css` to change colors, fonts, and layout
- The app uses CSS custom properties for easy theming
- Mobile breakpoints: 768px (tablet), 480px (mobile)

### AI Model
- Change the model in `app/api/generate-recipe/route.js`
- Adjust generation parameters (temperature, max tokens, etc.)

### Prompt Engineering
- Modify the prompt in the API route to get different recipe styles
- Add specific dietary restrictions or cuisine preferences

## 🐛 Troubleshooting

### Common Issues

1. **"API configuration error"**
   - Make sure `GEMINI_API_KEY` is set in your environment variables
   - Check Vercel dashboard → Settings → Environment Variables

2. **"Invalid API key"**
   - Verify your Google Gemini API key is correct and active
   - Check that you have enabled the Gemini API in your Google Cloud Console
   - Ensure the API key has proper permissions

3. **"API quota exceeded"**
   - You've reached your Gemini API quota limit
   - Check your usage at [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Consider upgrading your plan if needed

4. **Build errors on Vercel**
   - Ensure all dependencies are in `package.json`
   - Check that environment variables are set in Vercel dashboard
   - Review build logs in Vercel dashboard

5. **Mobile issues**
   - Test on different devices and browsers
   - Check that viewport meta tag is present
   - Verify touch targets are large enough (44px+)

### Vercel-Specific Issues

1. **Function timeout errors:**
   - Check `vercel.json` configuration
   - Increase `maxDuration` if needed
   - Optimize API response time

2. **Environment variables not working:**
   - Ensure variables are set for all environments
   - Redeploy after adding environment variables
   - Check variable names match exactly

3. **Deployment fails:**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are properly listed
   - Verify Node.js version compatibility

### Getting Help

- Check the browser console for detailed error messages
- Verify your Gemini API key is working at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Ensure you have sufficient API credits/quota
- Check the [Google AI documentation](https://ai.google.dev/) for more information
- Review [Vercel documentation](https://vercel.com/docs) for deployment issues

## 📱 Mobile Testing

### Testing Checklist:
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on tablet (iPad/Android)
- [ ] Verify touch interactions work
- [ ] Check text input doesn't zoom on iOS
- [ ] Test in portrait and landscape
- [ ] Verify loading states work
- [ ] Test with slow network connection

### Mobile Optimization Features:
- Responsive breakpoints (320px, 768px, 1024px)
- Touch-friendly button sizes (44px+)
- iOS zoom prevention (font-size: 16px)
- Smooth animations and transitions
- Dark mode support
- PWA capabilities

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Cooking! 🍽️**
