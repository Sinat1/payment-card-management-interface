import { createFileRoute } from '@tanstack/react-router';
import  MyCardsPage  from '@/pages/MyCardsPage';

export const Route = createFileRoute('/my-cards')({
  component: MyCardsPage,
});
