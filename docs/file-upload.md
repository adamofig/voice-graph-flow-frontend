# File Upload System

The File Upload system provides a modern, interactive interface for users to upload and preview files before processing them with AI.

## 📍 Path: `/upload-files`

## 🚀 Features

### 1. **Interactive Upload Zone**
- **Drag & Drop**: Users can drag files directly from their system into the browser.
- **Visual Feedback**: The upload zone highlights and scales slightly when a file is dragged over it.
- **Glassmorphic Design**: Built with semi-transparent backgrounds and blurs to match the app's premium aesthetic.

### 2. **File Preview & Management**
- **Type-Specific Icons**: Displays different icons based on the file type (Images, Videos, or Documents).
- **File Metadata**: Shows the filename and calculated size (in MB).
- **Simulated Progress**: A visual progress bar appears when a file is selected to simulate the preparation phase.
- **Easy Removal**: A quick-action "X" button to clear the selection and start over.

### 3. **Micro-Animations**
- Powered by `framer-motion`.
- Smooth transitions between the "Empty" and "File Selected" states.
- Hover and tap effects on all interactive elements.

## 🛠️ Technical Details

- **Component**: `app/upload-files/page.tsx`
- **State Management**: Uses React `useState` to hold the `File` object locally.
- **Styling**: 
  - Tailwind CSS 4 for layout and coloring.
  - Transparent `glassmorphism` effect via `backdrop-blur-xl` and `bg-white/5`.
  - Utility helper `lib/utils.ts` (`cn`) used for conditional classes.
- **Icons**: `lucide-react` (CloudUpload, File, CheckCircle2, Upload, FileText, ImageIcon, Film).

## 📋 Integration
The upload page is integrated into the main application sidebar as **"File Plus"**.
