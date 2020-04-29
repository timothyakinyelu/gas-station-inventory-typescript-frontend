import React from 'react';
import '../../styles/footer.css';

export default function Footer(): JSX.Element {
    return (
        <>
            {/* <footer>
                <div className="footer-inner">
                    <div className="container" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                        <div className="row">
                            <div className="main-footer col-lg-9 col-lg-pull-6 col-xs-12">
                                <p>
                                    Copyright © {new Date().getFullYear()}, inTree. & inTree. logo are proprietary
                                    trademarks of Flora Shaw Services.
                                </p>
                            </div>
                            <div className="mobile col-lg-9 col-lg-pull-6 col-xs-12">
                                <p>Copyright © {new Date().getFullYear()}, inTree.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> */}
            <footer className="footer">
                © {new Date().getFullYear()}, inTree. <a href="https://timothyakinyelu.herokuapp.com/">loverofMush</a>
            </footer>
        </>
    );
}
