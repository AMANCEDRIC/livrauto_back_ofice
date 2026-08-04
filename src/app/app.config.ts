import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEchartsCore } from 'ngx-echarts';
import { LucideAngularModule, LayoutDashboard, ShoppingBag, Map, Bike, Store, Users, CreditCard, ArrowDownToLine, Percent, Bell, BarChart3, Settings, LogOut, Search, Plus, Banknote, Mail, Lock, AlertCircle, MoreHorizontal, Minus, TrendingUp, TrendingDown, UserPlus, Download, HelpCircle, ChevronDown, Play, MoreVertical, Filter, ArrowDown, ChevronLeft, ChevronRight, Truck, Menu, AlertTriangle, Ban, Clock, Check } from 'lucide-angular';

import { routes } from './app.routes';
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideEchartsCore({ echarts: () => import('echarts') }),
    importProvidersFrom(LucideAngularModule.pick({ LayoutDashboard, ShoppingBag, Map, Bike, Store, Users, CreditCard, ArrowDownToLine, Percent, Bell, BarChart3, Settings, LogOut, Search, Plus, Banknote, Mail, Lock, AlertCircle, MoreHorizontal, Minus, TrendingUp, TrendingDown, UserPlus, Download, HelpCircle, ChevronDown, Play, MoreVertical, Filter, ArrowDown, ChevronLeft, ChevronRight, Truck, Menu, AlertTriangle, Ban, Clock, Check }))
  ]
};
