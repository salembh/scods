import React, { useState } from 'react';
import logo from '../images/moon.ico';
import './all.css';

function All() {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const rows = [
    { title: '• zOthers (Unorganized)', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/BO9RhQ7D" target="_blank">Click here to redirect</a> },
    { title: '• Youtube', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/setnzACC" target="_blank">Click here to redirect</a> },
    { title: '• SEO (Search Engine Optimization)', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/wX0nXIoT" target="_blank">Click here to redirect</a> },
    { title: '• Print on Demand', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/cb9lkYYa" target="_blank">Click here to redirect</a> },
    { title: '• Personal Brand Building & Course-Webinar Creation ', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/8K0DmKSL" target="_blank">Click here to redirect</a> },
    { title: '• Messenger Bot Building ', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/ZP8lDYDa" target="_blank">Click here to redirect</a> },
    { title: '• Investment & Credit', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/dPs1WQwZ" target="_blank">Click here to redirect</a> },
    { title: '• Instagram Marketing', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/EDkRHahR" target="_blank">Click here to redirect</a> },
    { title: '• Google Adwords & Google Shopping', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/Ma9FEIQR" target="_blank">Click here to redirect</a> },
    { title: '• Funnel Building ', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/gfk3GYAA" target="_blank">Click here to redirect</a> },
    { title: '• Forex & Trading', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/4L0FzCDL" target="_blank">Click here to redirect</a> },
    { title: '• Email Marketing', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/QT91CCDZ" target="_blank">Click here to redirect</a> },
    { title: '• eBay E-commerce', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/QXlRBKSL" target="_blank">Click here to redirect</a> },
    { title: '• Cryptopcurreny Courses', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/kX8hQCQR" target="_blank">Click here to redirect</a> },
    { title: '• Crowdfunding', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/5G0jzKyY" target="_blank">Click here to redirect</a> },
    { title: '• Copywriting Skill Courses', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/4a1TkA5A" target="_blank">Click here to redirect</a> },
    { title: '• Amazon FBA', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/catXCagK" target="_blank">Click here to redirect</a> },
    { title: '• Affiliate Marketing', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/gWtlHSgR" target="_blank">Click here to redirect</a> },
    { title: '✭ Social Media Marketing (SMMA) & Consulting', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/1a8ljAaT" target="_blank">Click here to redirect</a> },
    { title: '✭ Facebook Ads', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/cL8RQaoQ" target="_blank">Click here to redirect</a> },
    { title: '✭ Dropshipping', content: <a href="https://mega.nz/folder/1Ks01TiR#noVGm5BlMoKMU4IzfAiJGQ/folder/wWkVUYib" target="_blank">Click here to redirect</a> },
  ];

  return (
    <>
      <nav className='navbar'></nav>
      <a
        href="https://discord.gg/7Sj9FZmsGb"
        className="register"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault(); // Prevents the default anchor behavior
          window.open("https://discord.gg/7Sj9FZmsGb", "_blank");
        }}
      >Discord</a>
      
      <h1 className='header2'>All MoneyMaking Courses</h1>
      <p className='p1'></p>
        
      <table className="expandable-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={index}>
              <tr className="expandable-row" onClick={() => toggleRow(index)}>
                <td>{row.title}</td>
                <td>Click to expand</td>
              </tr>
              {expandedRow === index && (
                <tr className="expandable-content">
                  <td colSpan="2">
                    <div className="content">
                      <p>{row.content}</p>
                      {/* Add videos or other content here */}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      
      <p className='p2'>Made By Salem Ben Halima</p>

      <a href='/'>
        <img src={logo} alt="" className='logo'/>
      </a>
      <a href='/'>
        <h1 className='logo-text'>Scods.xyz</h1>
      </a>
    </>
  );
}

export default All;
