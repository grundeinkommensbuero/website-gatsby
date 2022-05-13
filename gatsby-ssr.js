import wrapWithProvider from './wrap-with-provider';

export const wrapRootElement = ({ element }) => wrapWithProvider(element);

/*  TODO: also needed here?

window.commitHash = COMMITHASH;
window.version = VERSION;
*/
