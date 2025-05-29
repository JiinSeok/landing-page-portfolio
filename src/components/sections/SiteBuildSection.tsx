// 'use client'
//
// import { SITE_BUILD_FEATURES } from '@/constants/sections/siteBuild'
// import { useTranslations } from '@/lib/mock-translations'
//
// /**
//  * Site Build section component for the homepage
//  *
//  * This component explains how the website was built, including technologies used,
//  * development process, site structure, applied methods, and new learnings.
//  */
// export default function SiteBuildSection() {
//   const t = useTranslations('HomePage')
//
//   return (
//     <section id="site-build" className="w-full py-20">
//       <div className="max-w-7xl mx-auto px-3">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             {t('site-build.title')}
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             {t('site-build.description')}
//           </p>
//         </div>
//
//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {SITE_BUILD_FEATURES.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
//                   <span className="text-2xl">{feature.icon}</span>
//                 </div>
//                 <h3 className="text-xl font-semibold">{t(feature.title)}</h3>
//               </div>
//               <p className="text-muted-foreground">{t(feature.description)}</p>
//             </div>
//           ))}
//         </div>
//
//         {/* Development Process Diagram */}
//         <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
//           <h3 className="text-2xl font-semibold mb-6 text-center">
//             {t('site-build.process.title')}
//           </h3>
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
//             {/* Step 1: Planning */}
//             <div className="flex flex-col items-center text-center max-w-xs">
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-2xl">📋</span>
//               </div>
//               <h4 className="font-semibold mb-2">Planning</h4>
//               <p className="text-sm text-muted-foreground">
//                 Requirements gathering, site architecture, and content planning
//               </p>
//             </div>
//
//             {/* Arrow */}
//             <div className="hidden md:block text-2xl text-muted-foreground">→</div>
//             <div className="block md:hidden text-2xl text-muted-foreground">↓</div>
//
//             {/* Step 2: Design */}
//             <div className="flex flex-col items-center text-center max-w-xs">
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-2xl">🎨</span>
//               </div>
//               <h4 className="font-semibold mb-2">Design</h4>
//               <p className="text-sm text-muted-foreground">
//                 UI/UX design, component structure, and responsive layouts
//               </p>
//             </div>
//
//             {/* Arrow */}
//             <div className="hidden md:block text-2xl text-muted-foreground">→</div>
//             <div className="block md:hidden text-2xl text-muted-foreground">↓</div>
//
//             {/* Step 3: Development */}
//             <div className="flex flex-col items-center text-center max-w-xs">
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-2xl">👨‍💻</span>
//               </div>
//               <h4 className="font-semibold mb-2">Development</h4>
//               <p className="text-sm text-muted-foreground">
//                 Frontend implementation, content integration, and testing
//               </p>
//             </div>
//
//             {/* Arrow */}
//             <div className="hidden md:block text-2xl text-muted-foreground">→</div>
//             <div className="block md:hidden text-2xl text-muted-foreground">↓</div>
//
//             {/* Step 4: Deployment */}
//             <div className="flex flex-col items-center text-center max-w-xs">
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-2xl">🚀</span>
//               </div>
//               <h4 className="font-semibold mb-2">Deployment</h4>
//               <p className="text-sm text-muted-foreground">
//                 Continuous integration, deployment, and performance optimization
//               </p>
//             </div>
//           </div>
//         </div>
//
//         {/* Site Structure Diagram */}
//         <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
//           <h3 className="text-2xl font-semibold mb-6 text-center">
//             {t('site-build.structure.title')}
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* Frontend */}
//             <div className="bg-background p-6 rounded-lg border border-border">
//               <h4 className="font-semibold mb-3 flex items-center">
//                 <span className="mr-2">🖥️</span> Frontend
//               </h4>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Next.js App Router</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>React Server Components</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Tailwind CSS</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>TypeScript</span>
//                 </li>
//               </ul>
//             </div>
//
//             {/* Content Management */}
//             <div className="bg-background p-6 rounded-lg border border-border">
//               <h4 className="font-semibold mb-3 flex items-center">
//                 <span className="mr-2">📄</span> Content
//               </h4>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>MDX for blog posts</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Static & dynamic content</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Internationalization</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>SEO optimization</span>
//                 </li>
//               </ul>
//             </div>
//
//             {/* Infrastructure */}
//             <div className="bg-background p-6 rounded-lg border border-border">
//               <h4 className="font-semibold mb-3 flex items-center">
//                 <span className="mr-2">🏗️</span> Infrastructure
//               </h4>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Vercel deployment</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>GitHub version control</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>CI/CD pipeline</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Analytics & monitoring</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//
//         {/* Applied Methods */}
//         <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
//           <h3 className="text-2xl font-semibold mb-6 text-center">
//             {t('site-build.methods.title')}
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Performance Optimization */}
//             <div className="bg-background p-6 rounded-lg border border-border">
//               <h4 className="font-semibold mb-3 flex items-center">
//                 <span className="mr-2">⚡</span> Performance Optimization
//               </h4>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Image optimization with next/image</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Code splitting and lazy loading</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Server-side rendering and static generation</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Efficient state management</span>
//                 </li>
//               </ul>
//             </div>
//
//             {/* Accessibility */}
//             <div className="bg-background p-6 rounded-lg border border-border">
//               <h4 className="font-semibold mb-3 flex items-center">
//                 <span className="mr-2">♿</span> Accessibility
//               </h4>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Semantic HTML structure</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>ARIA attributes for interactive elements</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Keyboard navigation support</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 text-primary">•</span>
//                   <span>Color contrast compliance</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//
//         {/* Learnings */}
//         <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
//           <h3 className="text-2xl font-semibold mb-6 text-center">
//             {t('site-build.learnings.title')}
//           </h3>
//           <div className="space-y-4">
//             <p className="text-muted-foreground">
//               Building this site provided valuable experience with Next.js App Router, React Server Components, and modern frontend development practices. Key learnings include:
//             </p>
//             <ul className="space-y-2 pl-6 list-disc">
//               <li className="text-muted-foreground">
//                 Optimizing for Core Web Vitals and performance metrics
//               </li>
//               <li className="text-muted-foreground">
//                 Implementing responsive designs that work across all device sizes
//               </li>
//               <li className="text-muted-foreground">
//                 Creating accessible UI components from scratch
//               </li>
//               <li className="text-muted-foreground">
//                 Managing content with MDX and structured data
//               </li>
//               <li className="text-muted-foreground">
//                 Setting up efficient development workflows with TypeScript
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }