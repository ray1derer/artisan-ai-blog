// app.js - 공통 UI 로직 및 초기화

function loadLayoutAndInit(pageInitFunction) {
    document.addEventListener('DOMContentLoaded', () => {
        // 1. 사이드바 로드
        fetch('sidebar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('sidebar.html 로드 실패');
                }
                return response.text();
            })
            .then(data => {
                const sidebarContainer = document.getElementById('sidebar-container');
                if (sidebarContainer) {
                    sidebarContainer.innerHTML = data;
                }

                // 2. 사이드바에 포함된 스크립트 재실행
                const scriptTags = sidebarContainer.querySelectorAll('script');
                scriptTags.forEach(scriptTag => {
                    const newScript = document.createElement('script');
                    newScript.textContent = scriptTag.textContent;
                    document.body.appendChild(newScript);
                });

                // 3. 페이지별 초기화 함수 실행
                if (typeof blogData !== 'undefined') {
                    if (pageInitFunction && typeof pageInitFunction === 'function') {
                        pageInitFunction(blogData);
                    }
                } else {
                    console.error('blogData 객체를 찾을 수 없습니다.');
                }
            })
            .catch(error => console.error('레이아웃 로딩 중 오류:', error));
    });
}

// Toast 알림 함수
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#333';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-in-out';

    document.body.appendChild(toast);

    // Fade in
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}
