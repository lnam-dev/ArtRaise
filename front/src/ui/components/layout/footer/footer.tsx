'use client';
import { ContentTransformer, Image } from '@crystallize/reactjs-components';
import { TenantLogo } from '../../../lib/tenant-logo';
import { useAppContext } from '../../../app-context/provider';
import { Footer as FooterType } from '~/use-cases/contracts/Footer';
import Link from '~/bridge/ui/Link';

import ArrowInsert from '~/assets/arrow-insert.svg';

import classes from './footer.module.scss';

export const Footer: React.FC<{ footer: FooterType }> = ({ footer }) => {
  const { state: appContextState } = useAppContext();

  return (
    <footer className={classes.footer}>
      <div className={classes.containerf}>
        <div className={classes.logoAndContactSection}>
          {/* Logo Section */}
          <div className={classes.logoSection}>
            <h2 className={classes.logoFooter}>ARTRAISE©</h2>
          </div>
          {/* Contact */}
          <div className={classes.contact}>
            <Link to='mailto:friendsofinaa@gmail.com'>
              friendsofinaa@gmail.com
            </Link>
            <p>+380 98 859 39 00</p>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Telegram</Link>
          </div>
        </div>

        <div className={classes.partners}>
          <div className={classes.lnaaSection}>
            <Image src='/lnaaLogo.png' alt='' width={36} height={55} />
            <p>Львівська національна академія мистецтв</p>
          </div>

          <div className={classes.friendsLnaaSection}>
            <Image src='/friendsLnaaLogo.png' alt='' width={22} height={53} />
            <p>
              Благодійний фонд <br />
              Друзі <br />
              Львівської національної <br />
              академії мистецтв
            </p>
          </div>

          <div className={classes.departmentGDSection}>
            <Image src='/departmentGDLogo.png' alt='' width={66} height={79} />
            <p>Кафедра Графічного дизайну</p>
          </div>
        </div>

        {/* Navigation */}
        <div className={classes.navigationFooter}>
          <Link className={classes.mainLink} to='/'>
            Хто ми є?
          </Link>
          <Link className={classes.minorLink} to='/'>
            Про нас
          </Link>
          <Link className={classes.minorLink} to='/'>
            Зв’язатися з нами
          </Link>
          <Link className={classes.minorLink} to='/'>
            Довідник колекціонера
          </Link>
          <Link className={classes.minorLink} to='/'>
            Збір на мистецтво
          </Link>
        </div>

        <div className={classes.contactMobile}>
          <Link to='mailto:friendsofinaa@gmail.com'>
            friendsofinaa@gmail.com
          </Link>
          <p>+380 98 859 39 00</p>
        </div>

        <div className={classes.bottomSection}>
          <div className={classes.bottomLeft}>
            <p className={classes.bottomLeftFirstP}>
              © {new Date().getFullYear()}, ArtRaise Services.
            </p>
            <p className={classes.bottomLeftSecondP}>All Rights Reserved</p>
          </div>

          <div className={classes.bottomRight}>
            <Link
              className={classes.scrollUp}
              to=''
              onClick={(e: any) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Догори
              <ArrowInsert />
            </Link>
            <p>Design by &lt;5</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
