import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Datacontext from './Context/Datacontext.jsx';
import BasketContext from './Context/BasketContext.jsx';
import { ContactProvider } from './Context/ContactContext.jsx';
import { UserAuthProvider } from './Context/AuthRegstr.jsx';
import { CustomAuthProvider } from './Context/Authlogin.jsx';
import CabinetDatam from './Context/CabinetContext.jsx';
import LikeContext from './Context/LikeContext.jsx';


createRoot(document.getElementById('root')).render(
  <Datacontext>
    <BrowserRouter>
      <BasketContext>
        <ContactProvider>
          <UserAuthProvider>
            <CustomAuthProvider>
              <CabinetDatam>
                <LikeContext>
       
                    <App />
               
                </LikeContext>
              </CabinetDatam>
            </CustomAuthProvider>
          </UserAuthProvider>
        </ContactProvider>
      </BasketContext>
    </BrowserRouter>
  </Datacontext>
);
