import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    sassOptions: {
        // The legacy SCSS still uses @import; silence Dart Sass deprecation noise until it's migrated to @use.
        silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
    },
};

export default nextConfig;
