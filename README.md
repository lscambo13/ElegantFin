<!-- Banner Image -->
<img src="https://github.com/user-attachments/assets/bb7f3174-b703-4c98-a23c-e6bb4abba390" alt="OnyxFin Theme for Jellyfin - Banner">

# ⭐ OnyxFin Theme
OnyxFin is a sleek, dark, and refined Jellyfin theme - a fork of ElegantFin. It enhances Jellyfin's interface with smooth animations, modern layouts, and a clean, minimalist design. Works on mobile, desktop, and TV.

#### **Author:** [Xenopsia](https://github.com/Xenopsia)

<hr>

### ✨ Key Features  
- Dark, elegant layouts and color tones  
- Smooth animations and hover effects  
- Rounded corners and consistent spacing  
- Clean layout highlighting important content  
- Works across phone, desktop, and TV  

<hr>

### 👇 How to install OnyxFin

<b>Paste this in the Custom CSS code box:</b>

```

@import url("https://cdn.jsdelivr.net/gh/Xenopsia/OnyxFin@main/Theme/OnyxFin-jellyfin-theme-build-latest-minified.css");

```

<details>
  <summary>Server-side or client-side setup steps</summary>

1. Open Settings → Dashboard → Branding tab (or General tab on older versions).  
2. Scroll to the Custom CSS code box.  
3. Paste the CSS above and click save.  
</details>

<hr>

### 🧩 Optional Customizations

- **Custom login background:**  
```

:root{
--loginPageBgUrl: url("<YOUR-JELLYFIN-SERVER-ADDRESS>/Branding/Splashscreen?format=webp&foregroundLayer=1&quality=33&width=3840&height=2160&blur=2");
}

```

- **Extra overlay buttons on cards (desktop):**  
```

:root{
--extraCardButtonsVisibility: block;
}

```

- **Center overlay play button on cards (desktop):**  
```

:root{
--overlayPlayButtonPosition: 50%;
}

```

- **Disable card hover reflection:**  
```

:root{
--cardHoverEffect: none;
}

```

- **Enable labels below library cards:**  
```

:root{
--libraryLabelVisibility: block;
}

```