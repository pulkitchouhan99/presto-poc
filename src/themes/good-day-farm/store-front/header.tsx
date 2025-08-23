import { useState } from 'react';
import styled from 'styled-components';
import {
  RemoteBoundaryComponent,
  useDataBridge,
  DataBridgeVersion,
  useAsyncLoader,
} from '@dutchiesdk/ecommerce-extensions-sdk';
import { Dispensary } from '@dutchiesdk/ecommerce-extensions-sdk';
import { ThemeWrapper } from '../components/theme-wrapper';
import { groupLocationsByState } from '../../../support/remote-data-utils';
import { Links } from './links';
import GDFLogo from './assets/gdf-logo';

const Header: RemoteBoundaryComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (dropdown: string) => {
    setShowDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const {
    dataLoaders: { locations: getAllLocations },
    location,
  } = useDataBridge();

  const { data: locations = [], isLoading } = useAsyncLoader(getAllLocations) as {
    data: Dispensary[];
    isLoading: boolean;
  };

  if (isLoading || !locations) {
    return null;
  }

  const groupedLocations = groupLocationsByState(locations);

  return (
    <ThemeWrapper>
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderLogo>
            <a href={Links.main.home} rel='noreferrer'>
              <GDFLogo />
            </a>
          </HeaderLogo>
          <div>
            <HeaderMenuMobileTrigger onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </HeaderMenuMobileTrigger>
            <HeaderDropdownTriggers isMenuOpen={isMenuOpen}>
              <HeaderDropdownTrigger onClick={() => toggleDropdown('locations')}>
                <span>Locations</span>
                <span>&#10095;</span>
              </HeaderDropdownTrigger>
              <HeaderLocationsDropdown expanded={showDropdown === 'locations'}>
                <HeaderLocationsDropdownContainer>
                  {Object.entries(groupedLocations).map(([state, locations]) => (
                    <HeaderLocationsColumn key={state}>
                      <HeaderLocationsHeading>{state}</HeaderLocationsHeading>
                      <HeaderLocationsLinkWrap>
                        <HeaderLocationsLinkColumn>
                          {locations.map((loc: Dispensary) => (
                            <HeaderLocationsLink key={loc.id} href={loc.links.storeFrontRoot} rel='noreferrer'>
                              {loc.name}
                            </HeaderLocationsLink>
                          ))}
                        </HeaderLocationsLinkColumn>
                      </HeaderLocationsLinkWrap>
                    </HeaderLocationsColumn>
                  ))}
                </HeaderLocationsDropdownContainer>
              </HeaderLocationsDropdown>
              <HeaderDropdownPair>
                <HeaderDropdownTrigger onClick={() => toggleDropdown('good-products')}>
                  <span>Good Products</span>
                  <span>&#10095;</span>
                </HeaderDropdownTrigger>
                <HeaderSmallDropdown expanded={showDropdown === 'good-products'}>
                  <HeaderSmallDropdownItem href={`${location?.links.storeFrontRoot}/specials`} rel='noreferrer'>
                    Specials
                  </HeaderSmallDropdownItem>
                  <HeaderSmallDropdownItem href={Links.main.brands} rel='noreferrer'>
                    Good Cannabis
                  </HeaderSmallDropdownItem>
                  <HeaderSmallDropdownItem href={Links.main.rewards} rel='noreferrer'>
                    Good Perks Rewards
                  </HeaderSmallDropdownItem>
                  <HeaderSmallDropdownItem href={Links.main.feelGood} rel='noreferrer'>
                    Feel Good States
                  </HeaderSmallDropdownItem>
                </HeaderSmallDropdown>
              </HeaderDropdownPair>
              <HeaderDropdownPair>
                <HeaderDropdownTrigger onClick={() => toggleDropdown('doing-good')}>
                  <span>Doing Good</span>
                  <span>&#10095;</span>
                </HeaderDropdownTrigger>
                <HeaderSmallDropdown expanded={showDropdown === 'doing-good'}>
                  <HeaderSmallDropdownItem href={Links.main.sprinkles} rel='noreferrer'>
                    Titty Sprinkles
                  </HeaderSmallDropdownItem>
                  <HeaderSmallDropdownItem href={Links.main.lpp} rel='noreferrer'>
                    Last Prisoner Project
                  </HeaderSmallDropdownItem>
                </HeaderSmallDropdown>
              </HeaderDropdownPair>
              <HeaderDropdownTriggerPill onClick={() => toggleDropdown('locations')}>
                <span></span>
                <span>Shop Now</span>
                <span>&#10095;</span>
              </HeaderDropdownTriggerPill>
              <HeaderLocationsDropdown expanded={showDropdown === 'locations'}>
                <HeaderLocationsDropdownContainer>
                  {Object.entries(groupedLocations).map(([state, locations]) => (
                    <HeaderLocationsColumn key={state}>
                      <HeaderLocationsHeading>{state}</HeaderLocationsHeading>
                      <HeaderLocationsLinkWrap>
                        <HeaderLocationsLinkColumn>
                          {locations.map((loc: Dispensary) => (
                            <HeaderLocationsLink key={loc.id} href={loc.links.storeFrontRoot} rel='noreferrer'>
                              {loc.name}
                            </HeaderLocationsLink>
                          ))}
                        </HeaderLocationsLinkColumn>
                      </HeaderLocationsLinkWrap>
                    </HeaderLocationsColumn>
                  ))}
                </HeaderLocationsDropdownContainer>
              </HeaderLocationsDropdown>
            </HeaderDropdownTriggers>
          </div>
        </HeaderContainer>
      </HeaderWrapper>
    </ThemeWrapper>
  );
};

Header.DataBridgeVersion = DataBridgeVersion;

export default Header;

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.black};
  position: relative;

  * {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const HeaderContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 0;
  }
`;

const HeaderLogo = styled.div`
  > a {
    display: inline-block;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }

    > svg {
      width: 48px;
      height: 50px;

      @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
        width: 60px;
        height: 63px;
      }
    }
  }
`;

const HeaderMenuMobileTrigger = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: none;
  }

  &:hover {
    cursor: pointer;

    > span {
      background-color: ${({ theme }) => theme.colors.gold};
    }
  }

  > span {
    display: block;
    width: 22px;
    height: 3px;
    margin-bottom: 4px;
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s ease-in-out;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const HeaderDropdownTriggers = styled.div<{ isMenuOpen: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  padding: 0 31px;
  flex-direction: column;
  text-align: left;
  align-items: stretch;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lgd}px) {
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
    z-index: 1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    position: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
  }
`;

const HeaderSmallDropdown = styled.div<{ expanded: boolean }>`
  border-top: 2px solid ${({ theme }) => theme.colors.white};
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lgd}px) {
    display: ${({ expanded }) => (expanded ? 'flex' : 'none')};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    position: absolute;
    top: 150%;
    background-color: ${({ theme }) => theme.colors.black};
    padding: 24px;
    right: 0;
    width: 135%;
    z-index: 2;
    display: none;

    &:hover {
      display: flex;
    }
  }
`;

const HeaderLocationsDropdown = styled.div<{ expanded: boolean }>`
  background-color: ${({ theme }) => theme.colors.black};
  padding: 12px 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.white};
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lgd}px) {
    display: ${({ expanded }) => (expanded ? 'flex' : 'none')};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    position: absolute;
    top: 80%;
    background-color: ${({ theme }) => theme.colors.black};
    padding: 24px;
    max-width: 80vw;
    overflow-x: scroll;
    display: none;

    &:hover {
      display: flex;
    }
  }
`;

const HeaderDropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    > span {
      color: ${({ theme }) => theme.colors.gold};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lgd}px) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-right: 24px;
    letter-spacing: 1px;

    &:hover + ${HeaderSmallDropdown} {
      display: flex;
    }

    &:hover + ${HeaderLocationsDropdown} {
      display: flex;
    }
  }

  > span {
    font-size: 14px;
    font-weight: bold;
    line-height: 53px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
    transition: 0.3s ease-in-out;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
      font-size: 20px;
      font-weight: normal;
      line-height: 24px;
    }

    &:last-child {
      font-size: 10px;
      transform: rotate(90deg);

      @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
        margin-left: 12px;
        margin-right: 0;
      }
    }
  }
`;

const HeaderDropdownTriggerPill = styled(HeaderDropdownTrigger)`
  border: 1px solid ${({ theme }) => theme.colors.white};
  text-align: center;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lgd}px) {
    padding: 0 24px;
    margin: 12px 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding: 0 12px;

    &:hover + ${HeaderLocationsDropdown} {
      display: flex;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.black};

    > span {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  > span {
    font-size: 24px;
    font-weight: normal;
    line-height: 50px;
    color: ${({ theme }) => theme.colors.black};

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
      font-size: 20px;
      line-height: 43px;
    }

    &:nth-child(2) {
      margin: 0 auto;
    }

    &:last-child {
      font-size: 20px;

      @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
        font-size: 12px;
      }
    }
  }
`;

const HeaderDropdownPair = styled.div`
  position: relative;
`;

const HeaderSmallDropdownItem = styled.a`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  font-size: 14px;
  font-weight: bold;
  line-height: 53px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  transition: 0.3s ease-in-out;
  text-decoration: none;
  display: inline-block;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const HeaderLocationsDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderLocationsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-wrap: nowrap;
`;

const HeaderLocationsHeading = styled.h3`
  font-size: 18px;
  line-height: 46px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  letter-spacing: 1px;
  font-weight: normal;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gold};
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 24px;
    line-height: 46px;
  }
`;

const HeaderLocationsLinkWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lgd}px) {
    margin-bottom: 12px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
  }
`;

const HeaderLocationsLinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const HeaderLocationsLink = styled.a`
  display: inline-block;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 54px;
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  transition: 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gold};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    border: none;
    font-weight: normal;
    line-height: 1.2;
    margin-bottom: 12px;
  }

  > span {
    line-height: 1;
    margin: 0;
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    font-size: 10px;
    font-weight: normal;
    border-radius: 2px;
    padding: 4px;

    @media (max-width: ${({ theme }) => theme.breakpoints.lgd}px) {
      margin-left: 4px;
    }
  }
`;
