import { pageRoute } from '@/views/routes';

const route = pageRoute('en-us');
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
