import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Profile } from './components/UserComponents/Profile/Profile';
import { Login } from './components/Login';
import { Register } from './components/Registration';
import { TourA } from './components/AdminComponents/Tour/Index';
import { TourAB } from './components/AdminComponents/BelTour/Index';
import { TourU } from './components/Tour';
import { TourH } from './components/HotTour';
import { TourHotel } from './components/UserComponents/Tour/Hotel';

import { CreateTour } from './components/AdminComponents/Tour/Create';
import { UpdateTour } from './components/AdminComponents/Tour/Update';
import { DeleteTour } from './components/AdminComponents/Tour/Delete';

import { HotelA } from './components/AdminComponents/Hotel/Index';
import { HotelU } from './components/Hotel';
import { CreateHotel } from './components/AdminComponents/Hotel/Create';
import { UpdateHotel } from './components/AdminComponents/Hotel/Update';
import { DeleteHotel } from './components/AdminComponents/Hotel/Delete';
import { Order } from './components/UserComponents/Order/Order';
import { Comment } from './components/AdminComponents/Comment/Index';
import { ShowOrder } from './components/UserComponents/Order/ShowOrder';
import { DeleteOrder } from './components/UserComponents/Order/DeleteOrder';

import { CreateBelTour } from './components/AdminComponents/BelTour/Create';
import { UpdateBelTour } from './components/AdminComponents/BelTour/Update';
import { DeleteBelTour } from './components/AdminComponents/BelTour/Delete';
import { TourBU } from './components/BelTour';





export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />

                <Route path='/toursA' component={TourA} />
                <Route path='/toursAB' component={TourAB} />

                <Route path='/hotelsTour/:id' component={TourHotel} />

                <Route path='/toursU' component={TourU} />
                <Route path='/toursH' component={TourH} />
                <Route path='/toursBU' component={TourBU} />

                <Route path='/createTour' component={CreateTour} />
                <Route path='/updateTour/:id' component={UpdateTour} />
                <Route path='/deleteTour/:id' component={DeleteTour} />

                <Route path='/createBelTour' component={CreateBelTour} />
                <Route path='/updateBelTour/:id' component={UpdateBelTour} />
                <Route path='/deleteBelTour/:id' component={DeleteBelTour} />

                <Route path='/comments' component={Comment} />

                <Route path='/hotelsA' component={HotelA} />
                <Route path='/hotelsU' component={HotelU} />
                <Route path='/createHotel' component={CreateHotel} />
                <Route path='/updateHotel/:id' component={UpdateHotel} />
                <Route path='/deleteHotel/:id' component={DeleteHotel} />

                <Route path='/orders/:id' component={Order} />
                <Route path='/showOrders/:id/' component={ShowOrder} />
                <Route path='/deleteOrder/:orderId/:id' component={DeleteOrder} />
            </Layout>
        );
    }
}
