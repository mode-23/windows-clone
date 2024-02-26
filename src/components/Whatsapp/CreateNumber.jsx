import React, { useState, useContext } from 'react'
import {BsChatSquareText, BsQrCodeScan} from 'react-icons/bs'
import { db } from '../../firebase/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import imageMonial from '../Home/Home_assest/wttesti.jpg'
import whatsappIcon from '../Home/Home_assest/whatsapp.png'
import { userContext } from '../../Context/UserContext'

const CreateNumber = ({user}) => {
  const [phNumber, setPhNumber] = useState('')
  const {generateCodeQr} = useContext(userContext);
  var numbers = /^[0-9]+$/;
  const updatePhoneNumber = async () => {
    if(user){
                const DocRef = doc(db, "user", user?.uid);
                if((phNumber != '' && phNumber.length  >= 8) && phNumber.match(numbers)){
                  await updateDoc(DocRef, {
                    phoneNumber: phNumber,
                  });
              }
          }
  }

  return (
    <div className='create_number'>
      <div className="left_createNumber">
        <h2 className='welcome'>Hello amigo!</h2>
        <div className="box_testimonial">
          <img src={imageMonial} alt={"single testimonial person"} />
          <h4>John Doe</h4>
          <div className="testimonial_paragraph">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta deserunt quos, repudiandae distinctio incidunt sapiente ad mollitia quod dolores rerum obcaecati eum, animi cum exercitationem nam sint. Id, eaque nemo.</p>
          </div>
        </div>
        <div className="whatsapp_pa">Simple, reliable, private messaging and calling for free.</div>
        <div className="wtsAppIcon df">
          <img src={whatsappIcon} alt="whatsapp icon" />
          <h4>whatsApp</h4>
        </div>
      </div>
      <div className="right_createNumber">
        <div className="qrCreate_number">
          <div className="holder_qr">
          <div className="qr_icon">
          <BsQrCodeScan />
          </div>
          <h4>Use <span>Whatsapp</span> on your phone</h4>
          <div className="qrCode_picture" style={{backgroundImage: `url(${generateCodeQr(window.location.href)})`}} />
          <p className="qrCode_label">
            <h5>How to use Whatsapp with your smartphone?</h5>
            <ol>
              <li>Open Whatsapp on your pc/laptop.</li>
              <li>Tap on settings ⚙️ in the top left of the page.</li>
              <li>Select <span>link a device.</span></li>
              <li>Point your phone to this screen to capture the QR code.</li>
              <li>Voila! 🎉</li>
            </ol>
          </p>
          </div>

        </div>
      <div className="number_input">
        <div className="qrCreate_number">
        <div className="holder_qr1">
        <div className="qr_icon">
        <BsChatSquareText />
          </div>
          <h4>Use <span>Whatsapp</span> on your phone</h4>
          <div className="input_num">
          <input type="password" placeholder='Your phone number' onChange={(e) => setPhNumber(e.target.value)} value={phNumber} />
          </div>
          <div className="button_wt">
          <button onClick={updatePhoneNumber} disabled={(phNumber == '' || phNumber.length  < 8) || !phNumber.match(numbers)}>Register</button>
          </div>
        </div>
        </div>
        {/* <input type="text" placeholder='xx - xxx - xxx' onChange={(e) => setPhNumber(e.target.value)} />
        <BsPhone className='phSvg' />
        <button onClick={updatePhoneNumber} disabled={(phNumber == '' || phNumber.length  < 8) || !phNumber.match(numbers)}>add</button> */}
      </div>
      </div>
      </div>
  )
}

export default CreateNumber