import '../index.css';
import { MultiSelect } from '../components/multiselect/multi-select';
import { ToastList } from '../components/toast/toast-list';
import { useToast } from '../components/toast/use-toast';

function HomePage() {
  const { toasts, removeToast, showToast } = useToast();

  return (
    <div className="home-page">
      <header className="app-header">Rick And Morty Selector</header>
      <div className="app-content">
        <div className="border border-card-foreground rounded-md p-4 w-max flex flex-col gap-4 bg-card text-card-foreground">
          <div className="flex flex-col gap-2">
            <p className="text-secondary text-2xl font-bold">Try Now!</p>
            <p>The Best Multiselect to Search Ricks & Mortys.</p>
          </div>
          <MultiSelect onError={(errorMessage: string) => showToast(errorMessage)} />
        </div>
      </div>
      <ToastList toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default HomePage;
