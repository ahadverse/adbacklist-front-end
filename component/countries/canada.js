import Link from 'next/link';
import React from 'react';
import data from "../../public/canada.json"
import styles from "../../styles/moduleCss/home.module.css";


const Canada = () => {
    return (
        <div>
            
          {data.map((a) => (
            <div id="United%20States" key={a._id}>
              <h1
                className={`text-lg uppercase font-bold text-white ${a.name}`}
              >
                {a.name}
              </h1>
              <div className={styles.countryBox}>
                {a?.children?.map((b) => (
                  <div  key={b._id}>
                    <h1 className="font-bold">{b.name}</h1>
                    {b?.children?.map((c) => (
                      <ul key={c._id}>
                        <li className="item text-yellow-600 hover:underline">
                          <Link
                            href={`/${c?.name}`}
                            className="text-decoration-none p-2"
                          >
                            {c.name}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    );
};

export default Canada;