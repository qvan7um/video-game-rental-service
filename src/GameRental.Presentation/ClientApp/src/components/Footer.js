import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Hỗ trợ</h2>
            <Link to='/'>Trung tâm trợ giúp</Link>
            <Link to='/'>Chăm sóc khách hàng</Link>
            <Link to='/'>Liên hệ</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Về GameRental</h2>
            <Link to='/'>Về chúng tôi</Link>
            <Link to='/'>Chính sách bảo mật</Link>
            <Link to='/'>Điều khoản</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Theo dõi chúng tôi trên</h2>
            <section class='social-media'>
              <div class='social-media-wrap'>
                <div class='social-icons'>
                  <Link
                    class='social-icon-link facebook'
                    to='/'
                    target='_blank'
                    aria-label='Facebook'
                  >
                    <i class='fab fa-facebook-f' />
                  </Link>
                  <Link
                    class='social-icon-link instagram'
                    to='/'
                    target='_blank'
                    aria-label='Instagram'
                  >
                    <i class='fab fa-instagram' />
                  </Link>
                  <Link
                    class='social-icon-link youtube'
                    to='/'
                    target='_blank'
                    aria-label='Youtube'
                  >
                    <i class='fab fa-youtube' />
                  </Link>
                  <Link
                    class='social-icon-link twitter'
                    to='/'
                    target='_blank'
                    aria-label='Twitter'
                  >
                    <i class='fab fa-twitter' />
                  </Link>
                </div>
              </div>
      </section>
          </div>
        </div>
      </div>
      <p class='website-rights'>Copyright GameRental 2023</p>
    </div>
  );
}

export default Footer;