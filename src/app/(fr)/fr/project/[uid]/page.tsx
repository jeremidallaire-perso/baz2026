import { projectRoute } from '@/views/routes';

const route = projectRoute('fr-ca');
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
