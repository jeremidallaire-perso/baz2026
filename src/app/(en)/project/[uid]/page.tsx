import { projectRoute } from '@/views/routes';

const route = projectRoute('en-us');
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
