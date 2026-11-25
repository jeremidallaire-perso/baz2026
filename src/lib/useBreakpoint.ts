'use client';

import { useEffect, useState } from 'react';

// Same breakpoint gatsby-plugin-breakpoints used for `sm`.
const SM_QUERY = '(max-width: 720px)';

/** Replacement for gatsby-plugin-breakpoints' useBreakpoint(). Returns false on the server. */
export function useBreakpoint() {
    const [sm, setSm] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(SM_QUERY);
        const update = () => setSm(mql.matches);
        update();
        mql.addEventListener('change', update);
        return () => mql.removeEventListener('change', update);
    }, []);

    return { sm };
}
