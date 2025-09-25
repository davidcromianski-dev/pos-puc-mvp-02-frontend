"use client";

import { 
  Heart, 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Download,
  Upload,
  Copy,
  ExternalLink
} from "lucide-react";
import { IconButton } from "./ui/icon-button";
import { Button } from "./ui/button";

export function IconExamples() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Icon Examples</h2>
      
      {/* Action Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Action Buttons</h3>
        <div className="flex gap-2">
          <IconButton icon={<Heart className="h-4 w-4" />} variant="ghost" />
          <IconButton icon={<Star className="h-4 w-4" />} variant="ghost" />
          <IconButton icon={<ThumbsUp className="h-4 w-4" />} variant="ghost" />
          <IconButton icon={<MessageCircle className="h-4 w-4" />} variant="ghost" />
          <IconButton icon={<Share2 className="h-4 w-4" />} variant="ghost" />
          <IconButton icon={<Bookmark className="h-4 w-4" />} variant="ghost" />
        </div>
      </div>

      {/* Buttons with Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Buttons with Icons</h3>
        <div className="flex gap-2 flex-wrap">
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Open Link
          </Button>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="flex items-center gap-4">
          <Heart className="h-4 w-4 text-red-500" />
          <Heart className="h-6 w-6 text-red-500" />
          <Heart className="h-8 w-8 text-red-500" />
          <Heart className="h-12 w-12 text-red-500" />
        </div>
      </div>

      {/* Different Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Colors</h3>
        <div className="flex items-center gap-4">
          <Star className="h-6 w-6 text-yellow-500" />
          <Star className="h-6 w-6 text-blue-500" />
          <Star className="h-6 w-6 text-green-500" />
          <Star className="h-6 w-6 text-purple-500" />
          <Star className="h-6 w-6 text-red-500" />
        </div>
      </div>

      {/* Status Indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status Indicators</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            <span>Away</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
