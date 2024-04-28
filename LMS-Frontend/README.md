# LMS frontend

### setup instructions --

1. install dependencies
```
   npm i 
```
2. run the server
```
   npm run dev 
```

### tailwind setup instructions

[tailwind official instruction doc](https://tailwindcss.com/docs/installation)

1. install tailwindcss
```
   npm install -D tailwindcss
```
2. create tailwind config file
```
   npx tailwindcss init
```
3. Add file extensions to tailwind config file
```
   "./src/**/*.{html,js,jsx,ts,tsx}" 
``` 
4. Add tailwind directives at the top of the `index.css` file
```
   @tailwind base;
   @tailwind components;
   @tailwind utilities; 
```