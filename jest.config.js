module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  // directorio que Jest usará para buscar archivos de prueba
  roots: ["<rootDir>/src/test"],
  // archivos a través de babel-jest
  transform: {
    "^.+\\.(js||jsx)$": "babel-jest",
  },
  // testEnvironment: "jsdom",
  // Configuración que manjeara los archivos de estilos y activos como imágenes
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    '^three/examples/jsm/controls/OrbitControls$': 'three/examples/jsm/controls/OrbitControls.js',
    "^three$": "three"
  },
  // Configura Jest para que ignore los directorios especificados
  testPathIgnorePatterns: ["/node_modules/"],
};