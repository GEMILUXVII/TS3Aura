const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Project root directory
const rootDir = path.join(__dirname, '..');

// Check directories and files
console.log('Checking project structure...');
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');

if (!fs.existsSync(frontendDir)) {
  console.error(`Frontend directory not found: ${frontendDir}`);
  process.exit(1);
}

if (!fs.existsSync(backendDir)) {
  console.error(`Backend directory not found: ${backendDir}`);
  process.exit(1);
}

// Install dependencies
console.log('\n===== Installing frontend dependencies =====');
const frontendInstall = spawn('npm', ['install'], { 
  cwd: frontendDir, 
  stdio: 'inherit',
  shell: true
});

frontendInstall.on('close', (code) => {
  if (code !== 0) {
    console.error('Frontend dependency installation failed');
    return;
  }
  
  console.log('\n===== Installing backend dependencies =====');
  const backendInstall = spawn('npm', ['install'], { 
    cwd: backendDir, 
    stdio: 'inherit',
    shell: true
  });
  
  backendInstall.on('close', (code) => {
    if (code !== 0) {
      console.error('Backend dependency installation failed');
      return;
    }
    
    console.log('\n===== Starting frontend server =====');
    const frontendProcess = spawn('npm', ['run', 'dev'], { 
      cwd: frontendDir, 
      stdio: 'inherit',
      shell: true,
      detached: true
    });
    
    console.log('\n===== Starting backend server =====');
    const backendProcess = spawn('npm', ['run', 'dev'], { 
      cwd: backendDir, 
      stdio: 'inherit',
      shell: true,
      detached: true
    });
    
    console.log('\n===== All servers started =====');
    console.log('Frontend: http://localhost:3000');
    console.log('Backend: http://localhost:3001');
    console.log('\nPress Ctrl+C to stop all servers');
    
    process.on('SIGINT', () => {
      console.log('Stopping all servers...');
      try {
        process.kill(-frontendProcess.pid);
        process.kill(-backendProcess.pid);
      } catch (err) {
        // 忽略错误
      }
      process.exit(0);
    });
  });
});
