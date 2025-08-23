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
import { Links } from './links';
import { Logo } from './assets/logo';
import { Caret } from './assets/caret';
import { NolaLocations } from './nola-locations';

const Header: RemoteBoundaryComponent = () => {
  const [locationsExpanded, setLocationsExpanded] = useState<boolean>(false);

  const toggleLocationsExpanded = () => {
    setLocationsExpanded((prev) => !prev);
  };

  const {
    dataLoaders: { locations: getAllLocations },
    location,
    menuContext,
    actions,
  } = useDataBridge();
  const { data: locations = [], isLoading } = useAsyncLoader(getAllLocations) as {
    data: Dispensary[];
    isLoading: boolean;
  };

  if (isLoading || !locations) {
    return null;
  }

  const getNolaLocationName = (locationId: string) => {
    const matchedLocation = NolaLocations.find((nolaLoc) => nolaLoc.id === locationId);
    return matchedLocation ? matchedLocation.name : '';
  };

  const nolaLocationIds = NolaLocations.map((loc) => loc.id);
  const nolaLocationList = locations.filter((loc) => nolaLocationIds.includes(loc.id));

  return (
    <ThemeWrapper>
      <Overlay expanded={locationsExpanded} onClick={toggleLocationsExpanded} />
        <HeaderMain>
          <HeaderContainer>
            <HeaderLogo>
              <a href={menuContext === 'kiosk' ? '#' : Links.main.home} rel='noreferrer'>
                <Logo />
              </a>
            </HeaderLogo>
            {menuContext !== 'kiosk' && (
              <HeaderLocations>
                <LocationsTrigger onClick={toggleLocationsExpanded}>
                  <h3>{location?.name}</h3>
                  <span>currently shopping</span>
                  <Caret />
                </LocationsTrigger>
                <LocationsList expanded={locationsExpanded}>
                  {nolaLocationList.map((loc) => {
                    const displayName = getNolaLocationName(loc.id);
                    return (
                      <a href={loc.links.storeFrontRoot} rel='noreferrer' key={loc.id}>
                        {displayName}
                      </a>
                    );
                  })}
                </LocationsList>
              </HeaderLocations>
            )}
          </HeaderContainer>
        </HeaderMain>
        {menuContext !== 'kiosk' && (
          <HeaderBottom>
            <a href={`${location?.links.storeFrontRoot}/products`} rel='noreferrer'>
              Shop All
            </a>
            <button onClick={() => actions.goToProductList({ categoryCname: 'flower' })}>Flower</button>
            <button onClick={() => actions.goToProductList({ categoryCname: 'edibles' })}>Edibles</button>
            <button onClick={() => actions.goToProductList({ categoryCname: 'vaporizers' })}>Vape</button>
            <button onClick={() => actions.goToProductList({ categoryCname: 'concentrates' })}>Concentrates</button>
            <button onClick={() => actions.goToProductList({ categoryCname: 'pre-rolls' })}>Pre Rolls</button>
          </HeaderBottom>
        )}
    </ThemeWrapper>
  );
};

Header.DataBridgeVersion = DataBridgeVersion;

export default Header;

const Overlay = styled.div<{ expanded: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9;
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`;

const HeaderMain = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid rgba(103, 80, 164, 0.16);
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 100px;
  }
`;

const HeaderLogo = styled.div`
  > a {
    display: inline-block;

    > svg {
      width: 100%;
      max-width: 350px;

      @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
        max-width: 600px;
      }
    }
  }
`;

const HeaderLocations = styled.div`
  position: relative;
`;

const LocationsTrigger = styled.div`
  background-color: ${({ theme }) => theme.colors.red};
  padding: 12px 40px;
  border-radius: 100px;
  cursor: pointer;
  border: 3px solid ${({ theme }) => theme.colors.black};
  position: relative;
  text-align: center;

  > h3 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.75px;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
      font-size: 21px;
    }
  }

  > span {
    color: ${({ theme }) => theme.colors.white};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.75px;
  }

  > svg {
    fill: ${({ theme }) => theme.colors.white};
    width: 8px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const LocationsList = styled.div<{ expanded: boolean }>`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px;
  border-radius: 32px;
  flex-direction: column;
  gap: 20px;
  display: ${({ expanded }) => (expanded ? 'flex' : 'none')};
  z-index: 10;

  > a {
    font-family: 'tt-travels-next', sans-serif;
    color: ${({ theme }) => theme.colors.charcoal};
    font-size: 16px;
    font-weight: 900;
    line-height: 27px;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.15s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightGrey};
    }
  }
`;

const HeaderBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 15px 20px;

  > a,
  > button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
  }
`;
