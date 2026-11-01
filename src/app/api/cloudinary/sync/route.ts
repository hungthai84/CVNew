import { NextResponse } from 'next/server';
import { fetchAllCloudinaryAssets } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const assets = await fetchAllCloudinaryAssets();
    return NextResponse.json({
      success: true,
      data: assets,
      summary: {
        totalFolders: assets.folders.length,
        totalImages: assets.totalImages,
        totalVideos: assets.totalVideos,
        source: assets.source,
        syncedAt: assets.syncedAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to fetch Cloudinary assets',
      },
      { status: 500 }
    );
  }
}
