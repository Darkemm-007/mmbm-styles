import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Loader2 } from "lucide-react";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";
import { toast } from "sonner";

const LogoTools = () => {
  const { cartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Show original
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    toast.info('Processing... This may take up to 30 seconds');

    try {
      // Load image
      const blob = await fetch(originalImage).then(r => r.blob());
      const imageElement = await loadImage(blob);

      // Remove background
      const resultBlob = await removeBackground(imageElement);

      // Create URL for download
      const url = URL.createObjectURL(resultBlob);
      setProcessedImage(url);

      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'mmbm-logo-transparent.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Logo downloaded!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={cartCount} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Logo Background Remover</h1>
            <p className="text-muted-foreground">
              Convert your logo to transparent PNG for use on any background
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upload Your Logo</CardTitle>
              <CardDescription>
                Upload your logo image and we'll remove the background to create a transparent PNG
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Click to upload logo</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, or JPEG (max 20MB)</p>
                </label>
              </div>

              {/* Preview Section */}
              {originalImage && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Original</h3>
                    <div className="border rounded-lg p-4 bg-white">
                      <img 
                        src={originalImage} 
                        alt="Original logo" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      {processedImage ? 'Transparent PNG' : 'Preview'}
                    </h3>
                    <div className="border rounded-lg p-4 bg-[repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0_10px,#ffffff_10px,#ffffff_20px)]">
                      {processedImage ? (
                        <img 
                          src={processedImage} 
                          alt="Processed logo" 
                          className="w-full h-auto"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-48 text-muted-foreground">
                          Click "Remove Background" to process
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {originalImage && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleRemoveBackground}
                    disabled={isProcessing}
                    variant="hero"
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Remove Background'
                    )}
                  </Button>

                  {processedImage && (
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PNG
                    </Button>
                  )}
                </div>
              )}

              {/* Instructions */}
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Tips for best results:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Use a high-quality image with clear edges</li>
                  <li>Logos with solid backgrounds work best</li>
                  <li>Processing may take 20-30 seconds</li>
                  <li>The output will be a transparent PNG file</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogoTools;
