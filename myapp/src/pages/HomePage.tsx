// App Layout
import AppLayout from '../components/layout/AppLayout';
import FeedColumn from '../components/layout/FeedColumn';

// App style
import '../App.css';

const Home = () => {
    return (
        <AppLayout>
            <FeedColumn />
        </AppLayout>
    )
}

export default Home;
