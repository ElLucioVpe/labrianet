using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using BusinessLogic.DataModel.Repositories;
using Persistencia.Database;

namespace BusinessLogic.DataModel
{
    public class UnitOfWork : IDisposable
    {
        protected readonly netriaEntities _context;

        //Repositorios
        private UserRepository _UserRepository;
        private JuegoRepository _JuegoRepository;
        private PreguntaRepository _PreguntaRepository;
        private RespuestaRepository _RespuestaRepository;
        private MusicaRepository _MusicaRepository;
        private PartidaRepository _PartidaRepository;
        //

        public UserRepository UserRepository
        {
            get
            {
                if (this._UserRepository == null)
                {
                    _UserRepository = new UserRepository(_context);
                }
                return _UserRepository;
            }
        }

        public JuegoRepository JuegoRepository
        {
            get
            {
                if (this._JuegoRepository == null)
                {
                    _JuegoRepository = new JuegoRepository(_context);
                }
                return _JuegoRepository;
            }
        }

        public PreguntaRepository PreguntaRepository
        {
            get
            {
                if (this._PreguntaRepository == null)
                {
                    _PreguntaRepository = new PreguntaRepository(_context);
                }
                return _PreguntaRepository;
            }
        }

        public RespuestaRepository RespuestaRepository
        {
            get
            {
                if (this._RespuestaRepository == null)
                {
                    _RespuestaRepository = new RespuestaRepository(_context);
                }
                return _RespuestaRepository;
            }
        }

        public MusicaRepository MusicaRepository
        {
            get
            {
                if (this._MusicaRepository == null)
                {
                    _MusicaRepository = new MusicaRepository(_context);
                }
                return _MusicaRepository;
            }
        }

        public PartidaRepository PartidaRepository
        {
            get
            {
                if (this._UserRepository == null)
                {
                    _PartidaRepository = new PartidaRepository(_context);
                }
                return _PartidaRepository;
            }
        }

        public UnitOfWork()
        {
            this._context = new netriaEntities();
        }

        public void Dispose()
        {
            this._context.Dispose();
        }

        public virtual int SaveChanges()
        {
            return this._context.SaveChanges();
        }
    }
}
