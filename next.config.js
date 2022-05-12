module.exports = {
 trailingSlash:true,
 exportPathMap: async function(
      defaultPathMap,
     { dev, dir, outDir, distDir, buildId }
 ) {
  return {
   "/": { page: "/"},
   "/category": { page: "/category"},
   "/categorytransaction": { page: "/categorytransaction/[category]"},
   "/login": { page: "/login" },
   "/product": { page: "/product"},
   "/productdetails": { page: "/productdetails/[Pcode]"},
   "/report": { page: "report"},
   "/transaction": { page: "/transaction"},
  };
 }
};

