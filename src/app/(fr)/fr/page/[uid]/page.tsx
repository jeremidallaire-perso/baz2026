import { pageRoute } from '@/views/routes';

const route = pageRoute('fr-ca');
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
