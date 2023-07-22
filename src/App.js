import Home from "./Components/Home";
import { BrowserRouter as Router , Switch , Route } from "react-router-dom/cjs/react-router-dom.min";
import InValidLink from "./Components/InValidLink";
import LinkExpired from "./Components/LinkExpired";
import SomeThingWentWrong from "./Components/SomeThingWentWrong";

const App = () =>{

    return (
     <div >
        <Router>
            <Switch>
                <Route exact path = "/" component = {Home}/>
                <Route exact path = "/invalidlink" component = {InValidLink}/>
                <Route exact path = "/expired" component = {LinkExpired}/>
                <Route exact path = "/issue" component = {SomeThingWentWrong}/>

            </Switch>
        </Router>
        </div>
    )

}



export default App;