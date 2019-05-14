import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = lazy(() => import('./Home'));
const Tasks = lazy(() => import('../modules/Task'));

const App = () => (
	<ErrorBoundary>
		<Router>
			<Link to="/">Home</Link>
			<Link to="/taken">Taken</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/taken" component={Tasks} />
				</Switch>
			</Suspense>
		</Router>
	</ErrorBoundary>
);

export default App;
