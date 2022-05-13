import LoadableTickerToSignup from '../../TickerToSignup/LoadableTickerToSignup';
import LoadablePledgePackages from '../../PledgePackage/ListPledgePackages/LoadablePledgePackages';
import LoadableCollectionMap from '../../Municipality/MunicipalityCollectionMap/LoadableCollectionMap';
import LoadableInviteFriends from '../../InviteFriends/LoadableInviteFriends';
import LoadableMapAndSearch from '../../Municipality/MapAndSearch/LoadableMapAndSearch';
import LoadableProgress from '../../Municipality/MunicipalityProgress/LoadableProgress';

// This proxy pattern is needed because of issues with loadable and ssr
// See also: https://github.com/graysonhicks/gatsby-plugin-loadable-components-ssr
export default {
  TickerToSignup: LoadableTickerToSignup,
  MunicipalityMap: LoadableMapAndSearch,
  MunicipalityProgress: LoadableProgress,
  InviteFriends: LoadableInviteFriends,
  CollectionMap: LoadableCollectionMap,
  PledgePackages: LoadablePledgePackages,
};
