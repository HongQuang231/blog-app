import React from 'react'
import MainPageComponent from './layout/MainPage'
import { Route, Routes } from 'react-router-dom'
import ProjectComponent from './layout/Project'
import ModernComponent from './layout/Modern'
import AboutComponent from './layout/About'
import ContractUsComponent from './layout/ContactUs'
import LoginComponent from './layout/admin/Login'
import DashboardComponent from './layout/admin/Dashboard'
import SettingHomeComponent from './layout/admin/SettingHome'
import SettingProjectComponent from './layout/admin/ProjectSetting'
import TagsComponent from './layout/admin/Tags'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPageComponent />} />
        <Route path='project' element={<ProjectComponent />}>
          <Route path='outstanding' element={<ProjectComponent />} />
          <Route path='INTERIOR' element={<ProjectComponent />} />
          <Route path='EXTERIOR' element={<ProjectComponent />} />
          <Route path='SHOP' element={<ProjectComponent />} />
          <Route path='FURNITURE' element={<ProjectComponent />} />
        </Route>
        <Route path='modern' element={<ModernComponent />} />
        <Route path='about' element={<AboutComponent />} />
        <Route path='contact' element={<ContractUsComponent />} />

        <Route path='login' element={<LoginComponent />} />
        <Route path='dashboard'>
          <Route path='setting-home' element={<SettingHomeComponent />} />
          <Route path='setting-project' element={<SettingProjectComponent />} />
          <Route path='tags' element={<TagsComponent />} />
        </Route>
      </Routes>
    </>
  )
}
