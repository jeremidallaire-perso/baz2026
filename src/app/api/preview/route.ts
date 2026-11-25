import { NextRequest } from 'next/server';
import { redirectToPreviewURL } from '@prismicio/next';
import { createClient } from '@/prismicio';

// Set this as the preview URL in Prismic: https://<your-site>/api/preview
export async function GET(request: NextRequest) {
    return await redirectToPreviewURL({ client: createClient(), request });
}
