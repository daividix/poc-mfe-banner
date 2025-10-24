import { render } from '@testing-library/angular';
import { App } from './app';
import { BannerContentService } from '@poc-mfe/shared';
import { signal } from '@angular/core';

describe('Banner Component', () => {
  const mockBannerContentText = {
    type: 'text' as const,
    content: 'Bienvenido al sistema'
  };

  const mockBannerContentImage = {
    type: 'image' as const,
    content: 'https://example.com/banner.jpg'
  };

  it('debería crear el componente', async () => {
    const mockBannerContentService = {
      content: signal(mockBannerContentText)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debería retornar el contenido del banner tipo text desde el servicio', async () => {
    const mockBannerContentService = {
      content: signal(mockBannerContentText)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    const component = fixture.componentInstance;

    expect(component.banner).toEqual(mockBannerContentText);
    expect(component.banner.type).toBe('text');
    expect(component.banner.content).toBe('Bienvenido al sistema');
  });

  it('debería retornar el contenido del banner tipo image desde el servicio', async () => {
    const mockBannerContentService = {
      content: signal(mockBannerContentImage)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    const component = fixture.componentInstance;

    expect(component.banner).toEqual(mockBannerContentImage);
    expect(component.banner.type).toBe('image');
    expect(component.banner.content).toBe('https://example.com/banner.jpg');
  });

  it('debería actualizar el banner cuando el servicio cambie de text a image', async () => {
    const mockBannerContentService = {
      content: signal(mockBannerContentText)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    const component = fixture.componentInstance;

    // Verificar contenido inicial (text)
    expect(component.banner).toEqual(mockBannerContentText);
    expect(component.banner.type).toBe('text');

    // Cambiar a imagen
    mockBannerContentService.content.set(mockBannerContentImage);

    // Verificar que el componente refleje el cambio
    expect(component.banner).toEqual(mockBannerContentImage);
    expect(component.banner.type).toBe('image');
  });

  it('debería actualizar el banner cuando el servicio cambie de image a text', async () => {
    const mockBannerContentService = {
      content: signal(mockBannerContentImage)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    const component = fixture.componentInstance;

    // Verificar contenido inicial (image)
    expect(component.banner.type).toBe('image');

    // Cambiar a texto
    mockBannerContentService.content.set(mockBannerContentText);

    // Verificar que el componente refleje el cambio
    expect(component.banner).toEqual(mockBannerContentText);
    expect(component.banner.type).toBe('text');
  });

  it('debería manejar contenido de banner vacío', async () => {
    const emptyBannerService = {
      content: signal(null)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: emptyBannerService }
      ]
    });

    const component = fixture.componentInstance;

    expect(component.banner).toBeNull();
  });

  it('debería manejar cambios múltiples en el contenido del banner', async () => {
    const mockBannerContentService = {
      content: signal(mockBannerContentText)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    const component = fixture.componentInstance;

    // Primera actualización
    const newTextContent = {
      type: 'text' as const,
      content: 'Nuevo mensaje de bienvenida'
    };
    mockBannerContentService.content.set(newTextContent);
    expect(component.banner).toEqual(newTextContent);

    // Segunda actualización
    const newImageContent = {
      type: 'image' as const,
      content: 'https://example.com/new-banner.jpg'
    };
    mockBannerContentService.content.set(newImageContent);
    expect(component.banner).toEqual(newImageContent);

    // Tercera actualización
    const anotherTextContent = {
      type: 'text' as const,
      content: 'Otro mensaje'
    };
    mockBannerContentService.content.set(anotherTextContent);
    expect(component.banner).toEqual(anotherTextContent);
  });

  it('debería llamar al getter banner múltiples veces sin errores', async () => {
    const mockBannerContentService = {
      content: signal(mockBannerContentText)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    const component = fixture.componentInstance;

    // Llamar al getter múltiples veces
    const firstCall = component.banner;
    const secondCall = component.banner;
    const thirdCall = component.banner;

    expect(firstCall).toEqual(mockBannerContentText);
    expect(secondCall).toEqual(mockBannerContentText);
    expect(thirdCall).toEqual(mockBannerContentText);
  });

  it('debería manejar contenido de texto vacío', async () => {
    const emptyTextContent = {
      type: 'text' as const,
      content: ''
    };

    const mockBannerContentService = {
      content: signal(emptyTextContent)
    };

    const { fixture } = await render(App, {
      providers: [
        { provide: BannerContentService, useValue: mockBannerContentService }
      ]
    });

    const component = fixture.componentInstance;

    expect(component.banner).toEqual(emptyTextContent);
    expect(component.banner.type).toBe('text');
    expect(component.banner.content).toBe('');
  });
});