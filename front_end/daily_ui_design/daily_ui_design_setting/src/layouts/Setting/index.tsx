import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import Icon, { IconType } from '@components/Icon';
import Button from './components/Button';
import Container from './components/Container';
import Content from './components/Content';
import Header from './components/Header';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import Options from './components/Options';
import Question from './components/Question';
import Result from './components/Result';
import Selection from './components/Selection';
import Selections from './components/Selections';
import SelectionsWrapper from './components/SelectionsWrapper';

const languages = [
  'Deutsch',
  'English',
  'espanol',
  'Italiano',
  'hrvatski',
  'Nederlands',
  'polski',
  'portugues(Brasil)',
];

const Setting = () => {
  const [index, setIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedLang(e.target.value);
  };

  return (
    <Container>
      <Header>
        <Icon type={IconType.Undo} width={32} height={32} size={32} />
        <span>Search Settings</span>
      </Header>
      <Content>
        <Menu>
          <MenuItem className={classNames({ selected: index === 0 })} onClick={() => setIndex(0)}>
            Search results
          </MenuItem>
          <MenuItem className={classNames({ selected: index === 1 })} onClick={() => setIndex(1)}>
            Languages
          </MenuItem>
          <MenuItem className={classNames({ selected: index === 2 })} onClick={() => setIndex(2)}>
            Appearance
          </MenuItem>
          <MenuItem className={classNames({ selected: index === 3 })} onClick={() => setIndex(3)}>
            Help
          </MenuItem>
        </Menu>
        <div>
          <Question>In what language would you like to use our project</Question>
          <SelectionsWrapper>
            <Selections>
              <div className="left">
                {languages.slice(0, Math.ceil(languages.length / 2)).map((lang) => (
                  <Selection key={lang}>
                    <input
                      id={`selection-${lang}`}
                      type="radio"
                      name="lang"
                      value={lang}
                      checked={selectedLang === lang}
                      onChange={onRadioChange}
                    />
                    <label htmlFor={`selection-${lang}`}>{lang}</label>
                  </Selection>
                ))}
              </div>
              <div className="right">
                {languages.slice(Math.ceil(languages.length / 2), languages.length).map((lang) => (
                  <Selection key={lang}>
                    <input
                      id={`selection-${lang}`}
                      type="radio"
                      name="lang"
                      value={lang}
                      checked={selectedLang === lang}
                      onChange={onRadioChange}
                    />
                    <label htmlFor={`selection-${lang}`}>{lang}</label>
                  </Selection>
                ))}
              </div>
            </Selections>
            <div className="showMore">
              <span>Show more</span>
              <Icon type={IconType.ArrowDown} size={22} width={22} height={22} />
            </div>
          </SelectionsWrapper>
          <Result>
            <div>Currently showing search results in:</div>
            <div>{selectedLang}</div>
          </Result>
          <Options>
            <Button>Cancel</Button>
            <Button primary>Save</Button>
          </Options>
        </div>
      </Content>
    </Container>
  );
};

export default Setting;
