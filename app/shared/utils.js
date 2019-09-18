
import { getRootView } from "tns-core-modules/application"


export const showDrawer = () => {
    let drawerNativeView = getRootView();
    if (drawerNativeView && drawerNativeView.showDrawer) {
        drawerNativeView.showDrawer();
    }
}

export const closeDrawer = () => {
    let drawerNativeView = getRootView();
    if (drawerNativeView && drawerNativeView.showDrawer) {
        drawerNativeView.closeDrawer();
    }
}

export const enableDrawer = () => {
    let drawerNativeView = getRootView();
    drawerNativeView.gesturesEnabled = true;
}

export const disableDrawer = () => {
    let drawerNativeView = getRootView();
    drawerNativeView.gesturesEnabled = false;
}